import { FC, useCallback, useMemo, useState, useRef } from 'react';
import cx from 'classnames';

import Map from 'components/map';
import ZoomControls from 'components/map/controls/zoom';

import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';

import Legend from './legend';

// constants
import { HIGHLIGHT_REGION_LAYER } from 'components/map/layers';
import { DEFAULT_VIEWPORT, LAYERS, BOUNDS, CCAA_DICTIONARY } from './constants';

// data
import CCAAGeometries from 'data/ccaa-geometries.json';

import type {
  MapTypes,
  ViewPortTypes,
  EventTypes,
  TooltipData,
  MapVisualizationType,
} from './types';

const MapRisk: FC<MapVisualizationType> = ({
  activeLayerId,
  geoType = 'municipio',
  scenario = { value: 'rcp45', label: '1.5°C' },
  year = { value: 'none', label: '' },
  bounds = 'spain',
  legend,
  crop,
  indicator,
  mobile = false,
}) => {
  const [viewport, setViewport] = useState<Partial<ViewPortTypes>>(DEFAULT_VIEWPORT);
  const HOVER = useRef<EventTypes>({});
  const CLICK = useRef<EventTypes>({});
  const MAP = useRef<MapTypes>();

  const promoteId =
    activeLayerId === 'cultivos'
      ? 'value'
      : activeLayerId === 'sequias-dehesa'
      ? 'ID'
      : geoType === 'municipios'
      ? 'CODIGOINE'
      : geoType === 'provincias'
      ? 'CO_PROVINC'
      : 'CO_CCAA';

  const visibleLayerId =
    activeLayerId === 'zonas-optimas-vino'
      ? `${activeLayerId}_${indicator?.value}`
      : activeLayerId === 'zonas-optimas-olivo'
      ? `${activeLayerId}_${year?.value}`
      : activeLayerId;

  const mapBounds = useMemo(() => {
    return {
      bbox: BOUNDS[bounds],
      options: {
        padding: 20,
      },
      viewportOptions: {
        transitionDuration: 1000,
      },
    };
  }, [bounds]);

  const legendType = indicator?.value.length ? `${legend}_${indicator?.value}` : legend;

  const handleViewport = useCallback((_viewport) => {
    setViewport(_viewport);
  }, []);

  // Map zoom
  const handleZoom = useCallback((zoom) => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom,
      transitionDuration: 250,
    }));
  }, []);

  // tooltip
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip<TooltipData>();

  const handleLoad = ({ map }) => {
    MAP.current = map;
  };

  const getRegionData = (e) => {
    if (e.features.length) {
      // console.log('hover:', e);
    }
    const { features } = e;

    if (e && features) {
      const properties =
        activeLayerId === 'zonas-optimas-vino'
          ? features.find((f) => f.source === `${activeLayerId}_${indicator.value}`)?.properties
          : features.find((f) => f.source === activeLayerId)?.properties;
      const id = properties?.[promoteId] || properties?.ID || properties?.CODIGOINE;
      const source = features[0]?.source;
      const sourceLayer = features[0]?.sourceLayer;
      const unit = properties?.unit === 'm s-1' ? 'mm/mes' : properties?.unit;

      const secondValue =
        activeLayerId === 'rendimiento-cereal'
          ? crop.value
          : year.value !== 'none'
          ? year.value.replace(/ /g, '')
          : crop
          ? crop.value
          : 0;

      const thisDirtyValue = properties?.[`value_${scenario.value}_${secondValue}`];
      const thisValue =
        activeLayerId === 'incendios-dehesa' || activeLayerId === 'zonas-optimas-vino'
          ? thisDirtyValue
          : activeLayerId === 'precipitacion'
          ? thisDirtyValue?.toFixed(1)
          : Math.round((thisDirtyValue + Number.EPSILON) * 10) / 10;

      const data = {
        id,
        source,
        sourceLayer,
        title: properties?.NAMEUNIT || properties?.DS_PROVINC || properties?.DS_CCAA,
        unit: unit,
        value: properties?.value || thisValue,
      };

      return data;
    } else {
      return null;
    }
  };

  const setHighlightedRegion = (data, eventType) => {
    const { id, source, sourceLayer } = data;
    const EVENT = eventType === 'click' ? CLICK : HOVER;

    if (MAP.current && EVENT.current.id) {
      MAP.current.setFeatureState(
        {
          ...EVENT.current,
        },
        { [eventType]: false },
      );
    }

    if (id && source) {
      EVENT.current = {
        id: id,
        source: source,
        ...(sourceLayer && { sourceLayer }),
      };

      if (MAP.current) {
        MAP.current.setFeatureState(
          {
            ...EVENT.current,
          },
          { [eventType]: true },
        );
      }
    }
  };

  // toolip: show on hover
  const handleHover = (e) => {
    const { center } = e;
    const data = getRegionData(e);

    if (data && data.value && data.value !== 'NaN') {
      if (
        (activeLayerId === 'cultivos-dehesa' && data.value !== 'Dehesa') ||
        (activeLayerId === 'cultivos-olivar' && data.value !== 'Olivar') ||
        (activeLayerId === 'cultivos-vinedo' && data.value !== 'Viñedo') ||
        (activeLayerId === 'cultivos-cereal' && data.value !== 'Cereal')
      ) {
        hideTooltip();
      } else {
        setHighlightedRegion(data, 'hover');
        showTooltip({
          tooltipData: data,
          tooltipLeft: center.x,
          tooltipTop: center.y,
        });
      }
    } else {
      hideTooltip();
    }
  };

  // Add dynamic stuff to layer params
  const updatedLayers = useMemo(() => {
    let layers = [];
    const dataLayers = LAYERS.filter((l) => l.id === visibleLayerId).map((layer) => ({
      ...layer,
      params: {
        ...(year && { year: year.value.split(' - ').join('-') }),
        scenario: scenario?.value,
        geoType: geoType,
        crop: crop?.value || '',
        indicator: indicator?.value || '',
        promoteId,
      },
    }));

    layers = dataLayers;

    if (bounds !== 'spain') {
      const geometry = CCAAGeometries.features.find(
        (f) => f.properties.DS_CCAA === CCAA_DICTIONARY[bounds],
      )?.geometry;

      const geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry,
          },
        ],
      };

      const highlightLayer = HIGHLIGHT_REGION_LAYER(bounds, geojson);

      // highlighted layer always on top to avoid be hidden by other layers
      layers = [highlightLayer, ...layers];
    }

    return layers;
  }, [geoType, promoteId, year, scenario, crop, indicator, visibleLayerId, bounds]);

  return (
    <div className="relative flex flex-col h-full">
      <div
        className={cx({
          'absolute top-0 left-0 right-0 h-full': true,
          'pointer-events-none': mobile,
        })}
      >
        <Map
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          mapStyle="mapbox://styles/coag/cl2yxfk0h002p14p6g6jg75u4"
          viewport={viewport}
          onMapViewportChange={handleViewport}
          scrollZoom={false}
          dragPan={true}
          doubleClickZoom={true}
          dragRotate={false}
          onHover={handleHover}
          // onClick={handleClick} // TODO: add this? Remeber the problems
          onMouseOut={hideTooltip}
          onMapLoad={handleLoad}
          interactiveLayerIds={[`${visibleLayerId}-fill-0`]}
          bounds={mapBounds}
        >
          {(map) => (
            <>
              <LayerManager map={map} plugin={PluginMapboxGl}>
                {updatedLayers?.map((l) => (
                  <Layer key={l.id} {...l} />
                ))}
              </LayerManager>
            </>
          )}
        </Map>
        {!mobile && (
          <div className="absolute z-10 top-20 right-5">
            <ZoomControls viewport={viewport} onZoomChange={handleZoom} />
          </div>
        )}
        {tooltipOpen && (
          <Tooltip
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              ...defaultStyles,
              position: 'fixed',
              transform: 'translateX(calc(-50% - 10px)) translateY(calc(-100% - 30px))',
              borderRadius: '0',
              boxShadow: 'none',
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                position: 'absolute',
                content: '',
                top: '100%',
                left: '50%',
                width: '0',
                height: '0',
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '5px solid white',
                transform: 'translateX(-50%)',
              }}
            ></span>
            <div className="text-black">{tooltipData.title}</div>
            <div className="mt-1 text-black">
              <strong>
                {`${tooltipData.value}${tooltipData.unit ? ' ' + tooltipData.unit : ''}`}
              </strong>
            </div>
          </Tooltip>
        )}
        {!mobile && (
          <div
            className={cx({
              'absolute w-96 py-1 bg-white bottom-8 right-4': !mobile,
            })}
          >
            <Legend legendType={legendType} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MapRisk;

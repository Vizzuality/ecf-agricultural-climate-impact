import { FC, useCallback, useMemo, useState, useRef } from 'react';

import Map from 'components/map';
import ZoomControls from 'components/map/controls/zoom';

import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';
import LegendItem from 'components/map/legend/item';
import LegendTypeGradient from 'components/map/legend/types/gradient';

import {
  DEFAULT_VIEWPORT,
  LAYERS,
  BOUNDS_SPAIN,
  LAYER_GRADIENT_SEQUIAS,
  LAYER_GRADIENT_CALENTAMIENTO,
} from './constants';

import type {
  MapTypes,
  ViewPortTypes,
  EventTypes,
  TooltipData,
  MapVisualizationType,
} from './types';

const MapVisualization: FC<MapVisualizationType> = ({
  activeLayerId,
  geoType,
  scenario,
  year,
  allowZoom,
  // municipality,
}) => {
  const [viewport, setViewport] = useState<Partial<ViewPortTypes>>(DEFAULT_VIEWPORT);
  const HOVER = useRef<EventTypes>({});
  const CLICK = useRef<EventTypes>({});
  const MAP = useRef<MapTypes>();

  const promoteId =
    geoType === 'municipios' ? 'CODIGOINE' : geoType === 'provincias' ? 'CO_PROVINC' : 'CO_CCAA';

  // Add dynamic stuff to layer params
  const updatedLayers = useMemo(() => {
    const newLayers = LAYERS.map((l) => ({
      ...l,
      ...(true && {
        params: {
          year: year.value.split(' - ').join('-'),
          scenario: scenario.value,
          geoType,
          visibility: l.id === activeLayerId ? 'visible' : 'none',
          promoteId,
          // municipality,
        },
      }),
    }));

    return newLayers;
  }, [activeLayerId, geoType, promoteId, year, scenario]);
  // }, [activeLayerId, geoType, municipality, promoteId, year, scenario]);

  const mapBounds = useMemo(() => {
    return {
      bbox: BOUNDS_SPAIN,
      options: {
        padding: 20,
      },
    };
  }, []);

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
    const { features } = e;

    if (e && features) {
      const properties = features.find((f) => f.source === activeLayerId)?.properties;
      const id = properties?.[promoteId];
      const source = features[0]?.source;
      const sourceLayer = features[0]?.sourceLayer;

      const thisDirtyValue =
        properties?.[`value_${scenario.value}_${year.value.replace(/ /g, '')}`];
      const thisValue = Math.round((thisDirtyValue + Number.EPSILON) * 10) / 10;

      const data = {
        id,
        source,
        sourceLayer,
        title: properties?.NAMEUNIT || properties?.DS_PROVINC || properties?.DS_CCAA,
        unit: properties?.unit,
        value: thisValue,
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

  // const handleClick = (e) => {
  //   const data = getRegionData(e);

  //   setHighlightedRegion(data, 'click');
  // };

  // toolip: show on hover
  const handleHover = (e) => {
    const { center } = e;
    const data = getRegionData(e);

    setHighlightedRegion(data, 'hover');

    if (data.title) {
      showTooltip({
        tooltipData: data,
        tooltipLeft: center.x,
        tooltipTop: center.y,
      });
    } else {
      hideTooltip();
    }
  };

  // useEffect(() => {
  //   setHighlightedRegion(
  //     {
  //       id: municipality.id,
  //       source: 'calentamiento',
  //       sourceLayer: 'Aumento_temperaturas',
  //     },
  //     'click',
  //   );
  // }, [municipality]);

  return (
    <div className="relative flex flex-col h-full">
      <div className="absolute top-0 left-0 right-0 h-full">
        <Map
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          mapStyle="mapbox://styles/aslribeiro/cl1l03yhp000514pi3penba92"
          viewport={viewport}
          onMapViewportChange={handleViewport}
          scrollZoom={allowZoom}
          dragPan={true}
          doubleClickZoom={true}
          dragRotate={false}
          onHover={handleHover}
          // onClick={handleClick} // TODO: add this? Remeber the problems
          onMouseOut={hideTooltip}
          onMapLoad={handleLoad}
          interactiveLayerIds={['calentamiento-fill-0', 'sequias-fill-0']} // TODO: get them from tiles
          bounds={mapBounds}
        >
          {(map) => (
            <>
              <LayerManager map={map} plugin={PluginMapboxGl}>
                {updatedLayers.map((l) => (
                  <Layer key={l.id} {...l} />
                ))}
              </LayerManager>
            </>
          )}
        </Map>
        <div className="absolute z-10 top-10 right-5">
          <ZoomControls viewport={viewport} onZoomChange={handleZoom} />
        </div>
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
                {tooltipData.value >= 0 && (
                  <>
                    {tooltipData.value} {tooltipData.unit}
                  </>
                )}
                {!(tooltipData.value >= 0) && <>No disponible</>}
              </strong>
            </div>
          </Tooltip>
        )}
        <div className="absolute py-1 bg-white bottom-4 right-4 w-60">
          <LegendItem
            // description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            icon={null}
            id="legend-temperature-1"
            name={
              activeLayerId === 'calentamiento'
                ? 'Grados de aumento en (°C)'
                : 'Duración de las sequías (días)'
            }
          >
            <LegendTypeGradient
              className="text-sm text-black"
              items={
                activeLayerId === 'calentamiento'
                  ? LAYER_GRADIENT_CALENTAMIENTO
                  : LAYER_GRADIENT_SEQUIAS
              }
            />
          </LegendItem>
        </div>
      </div>
    </div>
  );
};

export default MapVisualization;

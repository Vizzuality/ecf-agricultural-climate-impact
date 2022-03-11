import { useCallback, useMemo, useEffect, useState, useRef } from 'react';

import Map from 'components/map';
// import ZoomControls from 'components/map/controls/zoom';

import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';
import LegendItem from 'components/map/legend/item';
import LegendTypeGradient from 'components/map/legend/types/gradient';

import { DEFAULT_VIEWPORT, LAYERS, BOUNDS_SPAIN, LAYER_GRADIENT } from './constants';

import type { ViewPortTypes, TooltipData } from './types';

const MapVisualization = ({ activeLayerId, geoType, scenario, year, municipality }) => {
  const [viewport, setViewport] = useState<Partial<ViewPortTypes>>(DEFAULT_VIEWPORT);
  const HOVER = useRef({});
  const CLICK = useRef({});
  const MAP = useRef();

  const promoteId =
    geoType === 'municipios' ? 'CODIGOINE' : geoType === 'provincias' ? 'CO_PROVINC' : 'CO_CCAA';

  // Add dynamic stuff to layer params
  const updatedLayers = useMemo(() => {
    const newLayers = LAYERS.map((l) => ({
      ...l,
      visible: l.id === activeLayerId,
      ...(l.id === activeLayerId && {
        params: {
          startYear: '2011',
          endYear: '2040',
          scenario: 'rcp45',
          geoType,
          promoteId,
          municipality,
        },
      }),
    }));

    return newLayers;
  }, [activeLayerId, geoType, municipality, promoteId]);

  // TODO: Barre? Que es esto?
  const handleViewport = useCallback((_viewport) => {
    setViewport(_viewport);
  }, []);

  // Map zoom
  // const handleZoom = useCallback((zoom) => {
  //   setViewport((prevViewport) => ({
  //     ...prevViewport,
  //     zoom,
  //     transitionDuration: 250,
  //   }));
  // }, []);

  // tooltip
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip<TooltipData>();

  const handleLoad = ({ map }) => {
    MAP.current = map;
  };

  const getRegionData = (e) => {
    const { features } = e;

    if (e && features) {
      const properties = features.find((f) => f.source === LAYERS[0].id)?.properties;
      const id = properties?.[promoteId];
      const source = features[0]?.source;
      const sourceLayer = features[0]?.sourceLayer;

      const values = properties?.values && JSON.parse(properties.values);
      const thisDirtyValue = values && values[scenario.value][year.value];
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
    // const { features, center } = e;

    // if (e && features) {
    //   const properties = features.find((f) => f.source === LAYERS[0].id)?.properties;
    //   const id = properties?.[promoteId];
    //   const source = features[0]?.source;
    //   const sourceLayer = features[0]?.sourceLayer;

    //   const values = properties?.values && JSON.parse(properties.values);
    //   const thisDirtyValue = values && values[scenario.value][year.value];
    //   const thisValue = Math.round((thisDirtyValue + Number.EPSILON) * 10) / 10;

    //   const data = {
    //     id: properties?.[promoteId],
    //     title: properties?.NAMEUNIT || properties?.DS_PROVINC || properties?.DS_CCAA,
    //     unit: properties?.unit,
    //     value: thisValue,
    //   };

    //   if (MAP.current && HOVER.current.id) {
    //     MAP.current.setFeatureState(
    //       {
    //         ...HOVER.current,
    //       },
    //       { hover: false },
    //     );
    //   }

    //   if (id && source) {
    //     HOVER.current = {
    //       id,
    //       source,
    //       ...(sourceLayer && { sourceLayer }),
    //     };

    //     if (MAP.current) {
    //       MAP.current.setFeatureState(
    //         {
    //           ...HOVER.current,
    //         },
    //         { hover: true },
    //       );
    //     }
    //   }

    //   // console.log(data);

    if (data.title) {
      showTooltip({
        tooltipData: data,
        tooltipLeft: center.x,
        tooltipTop: center.y,
      });
    } else {
      hideTooltip();
    }
    // }
  };

  useEffect(() => {
    setHighlightedRegion(
      {
        id: municipality.id,
        source: 'calentamiento',
        sourceLayer: 'Aumento_temperaturas',
      },
      'click',
    );
  }, [municipality]);

  return (
    <div className="relative flex flex-col h-full">
      <div className="absolute top-0 left-0 right-0 h-full">
        <Map
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          viewport={viewport}
          onMapViewportChange={handleViewport}
          scrollZoom={false}
          dragPan={false}
          dragRotate={false}
          onHover={handleHover}
          // onClick={handleClick} // TODO: add this? Remeber the problems
          onMouseOut={hideTooltip}
          onMapLoad={handleLoad}
          interactiveLayerIds={['calentamiento-fill-0']} // TODO: get them from tiles
          bounds={{
            bbox: BOUNDS_SPAIN,
            options: {
              padding: 20,
            },
          }}
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
        {/* <div className="absolute z-10 top-10 right-5">
          <ZoomControls viewport={viewport} onZoomChange={handleZoom} />
        </div> */}
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
                {tooltipData.value} {tooltipData.unit}
              </strong>
            </div>
          </Tooltip>
        )}
        <div className="absolute py-1 bg-white bottom-4 right-4 w-60">
          <LegendItem
            // description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            icon={null}
            id="legend-temperature-1"
            name="Grados de aumento en °C"
          >
            <LegendTypeGradient className="text-sm text-black" items={LAYER_GRADIENT} />
          </LegendItem>
        </div>
      </div>
    </div>
  );
};

export default MapVisualization;

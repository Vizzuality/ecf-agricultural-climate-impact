import { useCallback, useEffect, useState } from 'react';

import Map from 'components/map';
import ZoomControls from 'components/map/controls/zoom';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';
// import {
//   Legend,
//   LegendListItem,
//   LegendItemToolbar,
//   LegendItemTypes,
//   Icons,
// } from 'vizzuality-components';

import { DEFAULT_VIEWPORT, LAYERS } from './constants';

import type { ViewPortTypes } from './types';

const MapVisualization = ({ activeLayerId }) => {
  const [viewport, setViewport] = useState<Partial<ViewPortTypes>>(DEFAULT_VIEWPORT);
  const [layers, setLayers] = useState(LAYERS);

  useEffect(() => {
    setLayers(
      layers.map((l) => ({
        ...l,
        visible: l.id === activeLayerId,
      })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLayerId]);

  const handleViewport = useCallback((_viewport) => {
    setViewport(_viewport);
  }, []);

  const handleZoom = useCallback((zoom) => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom,
      transitionDuration: 250,
    }));
  }, []);

  return (
    <div className="relative flex flex-col h-full">
      <div className="absolute top-0 left-0 right-0 h-full">
        <Map
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          viewport={viewport}
          onMapViewportChange={handleViewport}
        >
          {(map) => (
            <>
              <LayerManager map={map} plugin={PluginMapboxGl}>
                {layers.map((l) => (
                  <Layer key={l.id} {...l} />
                ))}
              </LayerManager>
            </>
          )}
        </Map>
        <div className="absolute z-10 top-10 right-5">
          <ZoomControls viewport={viewport} onZoomChange={handleZoom} />
        </div>
        {/* <div className="absolute z-10 max-w-sm bottom-10 right-5 lg:max-w-none">
          <Legend maxHeight={300} onChangeOrder={onChangeOrder}>
            {layerGroups.map((lg, i) => (
              <LegendListItem
                index={i}
                key={lg.id}
                layerGroup={lg}
                toolbar={<LegendItemToolbar />}
                onChangeInfo={onChangeInfo}
                onChangeOpacity={onChangeOpacity}
                onChangeVisibility={onChangeVisibility}
                onChangeLayer={onChangeLayer}
                onRemoveLayer={onRemoveLayer}
              >
                <LegendItemTypes />
              </LegendListItem>
            ))}
          </Legend>
        </div> */}
      </div>
    </div>
  );
};

export default MapVisualization;

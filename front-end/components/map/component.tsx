import { useEffect, useState, useRef, useCallback, FC } from 'react';

import ReactMapGL, { FlyToInterpolator, TRANSITION_EVENTS } from 'react-map-gl';

import cx from 'classnames';

import isEmpty from 'lodash/isEmpty';

import { fitBounds } from '@math.gl/web-mercator';
import { easeCubic } from 'd3-ease';
import { useDebouncedCallback } from 'use-debounce';

import { DEFAULT_VIEWPORT } from './constants';
import type { MapProps } from './types';

export const Map: FC<MapProps> = ({
  mapboxApiAccessToken,
  children,
  className,
  viewport,
  bounds,
  basemap,
  labels,
  boundaries,
  onMapReady,
  onMapLoad,
  onMapViewportChange,
  dragPan,
  dragRotate,
  scrollZoom,
  touchZoom,
  touchRotate,
  doubleClickZoom,
  width = '100%',
  height = '100%',
  getCursor,
  ...mapboxProps
}: MapProps) => {
  /**
   * REFS
   */
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  /**
   * STATE
   */
  const [mapViewport, setViewport] = useState({
    ...DEFAULT_VIEWPORT,
    ...viewport,
  });
  const [flying, setFlight] = useState(false);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const setBasemap = useCallback(() => {
    if (!mapRef.current) return false;

    const BASEMAP_GROUPS = ['basemap'];
    const { layers, metadata } = mapRef.current.getStyle();

    const basemapGroups = Object.keys(metadata['mapbox:groups']).filter((k) => {
      const { name } = metadata['mapbox:groups'][k];

      const matchedGroups = BASEMAP_GROUPS.map((rgr) => name.toLowerCase().includes(rgr));

      return matchedGroups.some((bool) => bool);
    });

    const basemapsWithMeta = basemapGroups.map((groupId) => ({
      ...metadata['mapbox:groups'][groupId],
      id: groupId,
    }));
    const basemapToDisplay = basemapsWithMeta.find((_basemap) => _basemap.name.includes(basemap));

    const basemapLayers = layers.filter((l) => {
      const { metadata: layerMetadata } = l;
      if (!layerMetadata) return false;

      const gr = layerMetadata['mapbox:group'];
      return basemapGroups.includes(gr);
    });

    if (!basemapToDisplay) return false;

    basemapLayers.forEach((_layer) => {
      const match = _layer.metadata['mapbox:group'] === basemapToDisplay.id;
      if (!match) {
        mapRef.current.setLayoutProperty(_layer.id, 'visibility', 'none');
      } else {
        mapRef.current.setLayoutProperty(_layer.id, 'visibility', 'visible');
      }
    });

    return true;
  }, [basemap]);

  const setLabels = useCallback(() => {
    const LABELS_GROUP = ['labels'];
    const { layers, metadata } = mapRef.current.getStyle();

    const labelGroups = Object.keys(metadata['mapbox:groups']).filter((k) => {
      const { name } = metadata['mapbox:groups'][k];

      const matchedGroups = LABELS_GROUP.filter((rgr) => name.toLowerCase().includes(rgr));

      return matchedGroups.some((bool) => bool);
    });

    const labelsWithMeta = labelGroups.map((groupId) => ({
      ...metadata['mapbox:groups'][groupId],
      id: groupId,
    }));
    const labelsToDisplay = labelsWithMeta.find((_basemap) => _basemap.name.includes(labels)) || {};

    const labelLayers = layers.filter((l) => {
      const { metadata: layerMetadata } = l;
      if (!layerMetadata) return false;

      const gr = layerMetadata['mapbox:group'];
      return labelGroups.includes(gr);
    });

    labelLayers.forEach((_layer) => {
      const match = _layer.metadata['mapbox:group'] === labelsToDisplay.id;
      mapRef.current.setLayoutProperty(_layer.id, 'visibility', match ? 'visible' : 'none');
    });

    return true;
  }, [labels]);

  const setBoundaries = useCallback(() => {
    const LABELS_GROUP = ['boundaries'];
    const { layers, metadata } = mapRef.current.getStyle();

    const boundariesGroups = Object.keys(metadata['mapbox:groups']).filter((k) => {
      const { name } = metadata['mapbox:groups'][k];

      const labelsGroup = LABELS_GROUP.map((rgr) => name.toLowerCase().includes(rgr));

      return labelsGroup.some((bool) => bool);
    });

    const boundariesLayers = layers.filter((l) => {
      const { metadata: layerMetadata } = l;
      if (!layerMetadata) return false;

      const gr = layerMetadata['mapbox:group'];
      return boundariesGroups.includes(gr);
    });

    boundariesLayers.forEach((l) => {
      mapRef.current.setLayoutProperty(l.id, 'visibility', boundaries ? 'visible' : 'none');
    });
  }, [boundaries]);

  /**
   * CALLBACKS
   */
  const handleLoad = useCallback(() => {
    setLoaded(true);
    if (onMapLoad) {
      onMapLoad({ map: mapRef.current, mapContainer: mapContainerRef.current });
    }
    setBasemap();
    setLabels();
    setBoundaries();
  }, [onMapLoad]);

  const debouncedOnMapViewportChange = useDebouncedCallback((v) => {
    onMapViewportChange(v);
  }, 250);

  const handleViewportChange = useCallback(
    (v) => {
      setViewport(v);
      debouncedOnMapViewportChange(v);
    },
    [debouncedOnMapViewportChange]
  );

  const handleResize = useCallback(
    (v) => {
      const newViewport = {
        ...mapViewport,
        ...v,
      };

      setViewport(newViewport);
      debouncedOnMapViewportChange(newViewport);
    },
    [mapViewport, debouncedOnMapViewportChange]
  );

  const handleFitBounds = useCallback(() => {
    if (!ready) return null;
    const { bbox, options = {}, viewportOptions = {} } = bounds;
    const { transitionDuration = 0 } = viewportOptions;

    if (mapContainerRef.current.offsetWidth <= 0 || mapContainerRef.current.offsetHeight <= 0) {
      // eslint-disable-next-line no-console
      console.error("mapContainerRef doesn't have dimensions");
      return null;
    }

    const { longitude, latitude, zoom } = fitBounds({
      width: mapContainerRef.current.offsetWidth,
      height: mapContainerRef.current.offsetHeight,
      bounds: [
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ],
      ...options,
    });

    const newViewport = {
      longitude,
      latitude,
      zoom,
      transitionDuration,
      transitionInterruption: TRANSITION_EVENTS.UPDATE,
      ...viewportOptions,
    };

    setFlight(true);
    setViewport((prevViewport) => ({
      ...prevViewport,
      ...newViewport,
    }));
    debouncedOnMapViewportChange(newViewport);

    return setTimeout(() => {
      setFlight(false);
    }, +transitionDuration);
  }, [ready, bounds, debouncedOnMapViewportChange]);

  const handleGetCursor = useCallback(
    ({ isHovering, isDragging }) => {
      if (isHovering) return 'pointer';
      if (isDragging) return 'grabbing';
      return 'grab';
    },
    [basemap]
  );

  /**
   * EFFECTS
   */
  useEffect(() => {
    setReady(true);
    if (onMapReady) {
      onMapReady({ map: mapRef.current, mapContainer: mapContainerRef.current });
    }
  }, [onMapReady]);

  useEffect(() => {
    if (!isEmpty(bounds) && !!bounds.bbox && bounds.bbox.every((b) => !!b)) {
      handleFitBounds();
    }
  }, [bounds, handleFitBounds]);

  useEffect(() => {
    setViewport((prevViewportState) => ({
      ...prevViewportState,
      ...viewport,
    }));
  }, [viewport]);

  useEffect(() => {
    if (loaded) setBasemap();
  }, [basemap]);

  useEffect(() => {
    if (loaded) setLabels();
  }, [labels]);

  useEffect(() => {
    if (loaded) setBoundaries();
  }, [boundaries]);

  return (
    <div
      ref={mapContainerRef}
      className={cx({
        'relative w-full h-full z-0': true,
        [className]: !!className,
      })}
    >
      <ReactMapGL
        ref={(_map) => {
          if (_map) {
            mapRef.current = _map.getMap();
          }
        }}
        mapboxApiAccessToken={mapboxApiAccessToken}
        mapStyle="mapbox://styles/resourcewatch/cjzmw480d00z41cp2x81gm90h"
        // CUSTOM PROPS FROM REACT MAPBOX API
        {...mapboxProps}
        // VIEWPORT
        {...mapViewport}
        width={width}
        height={height}
        // INTERACTIVITY
        dragPan={!flying && dragPan}
        dragRotate={!flying && dragRotate}
        scrollZoom={!flying && scrollZoom}
        touchZoom={!flying && touchZoom}
        touchRotate={!flying && touchRotate}
        doubleClickZoom={!flying && doubleClickZoom}
        // DEFAULT FUNC IMPLEMENTATIONS
        onViewportChange={handleViewportChange}
        onResize={handleResize}
        onLoad={handleLoad}
        getCursor={getCursor || handleGetCursor}
        transitionInterpolator={new FlyToInterpolator()}
        transitionEasing={easeCubic}
      >
        {ready &&
          loaded &&
          !!mapRef.current &&
          typeof children === 'function' &&
          children(mapRef.current)}
      </ReactMapGL>
    </div>
  );
};

export default Map;

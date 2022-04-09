import { ViewportProps } from 'react-map-gl';

import { MapProps } from 'react-map-gl/src/components/map';

export interface ReactMapProps extends MapProps {
  /** A function that returns the map instance */
  children?: React.ReactNode;

  /** Custom css class for styling */
  className?: string;

  /** An object that defines the viewport
   * @see https://uber.github.io/react-map-gl/#/Documentation/api-reference/interactive-map?section=initialization
   */
  viewport?: Partial<ViewportProps>;

  /** An object that defines the bounds */
  bounds?: {
    bbox: number[];
    options?: Record<string, unknown>;
    viewportOptions?: Partial<ViewportProps>;
  };

  /** A function that exposes when the map is mounted.
   * It receives and object with the `mapRef` and `mapContainerRef` reference. */
  onMapReady?: ({ map, mapContainer }) => void;

  /** A function that exposes when the map is loaded.
   * It receives and object with the `mapRef` and `mapContainerRef` reference. */
  onMapLoad?: ({ map, mapContainer }) => void;

  /** A function that exposes the viewport */
  onMapViewportChange?: (viewport: Partial<ViewportProps>) => void;
}

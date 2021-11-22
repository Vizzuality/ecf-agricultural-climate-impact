export const DEFAULT_VIEWPORT = {
  zoom: 2,
  latitude: 0,
  longitude: 0,
  pitch: 0,
  bearing: 0,
  transitionDuration: 250,
  maxZoom: 22,
  minZoom: 1,
};

export const LAYERS = [
  {
    id: 'gain',
    name: 'Tree cover gain',
    type: 'raster',
    source: {
      type: 'raster',
      tiles: ['https://earthengine.google.org/static/hansen_2013/gain_alpha/{z}/{x}/{y}.png'],
      minzoom: 3,
      maxzoom: 12,
    },
  },
  {
    id: 'protected-areas',
    name: 'Protected areas',
    type: 'vector',
    source: {
      type: 'vector',
      tiles: ['{host}/tiles/composite.10738f07/{z}/{x}/{y}.vector.pbf'],
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'layer0',
          featureState: {},
          paint: {
            'fill-color': 'hsla(32, 53%, 16%, 0.6)',
            'fill-translate': [0, -2.5],
          },
        },
      ],
    },
  },
];

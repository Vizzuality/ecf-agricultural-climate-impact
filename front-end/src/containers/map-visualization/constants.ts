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
    config: {
      source: {
        type: 'raster',
        tiles: ['https://earthengine.google.org/static/hansen_2013/gain_alpha/{z}/{x}/{y}.png'],
        minzoom: 3,
        maxzoom: 12,
      },
    },
    legendConfig: {
      type: 'basic',
      items: [
        {
          name: 'Tree cover gain',
          color: '#6D6DE5',
        },
      ],
    },
  },
];

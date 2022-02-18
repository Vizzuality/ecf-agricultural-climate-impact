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
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/RasterTiles/olivar/Arenas_Castro/1961_2000/{z}/{x}/{y}.png',
      ],
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
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/MBTiles/OpenGHGMap/%7Bz%7D/%7Bx%7D/%7By%7D.pbf',
      ],
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

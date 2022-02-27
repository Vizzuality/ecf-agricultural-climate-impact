
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
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/RasterTiles/olivar/Arenas_Castro/{{startYear}}_{{endYear}}/{z}/{x}/{y}.png',
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
        'http://localhost:3000/map_tiles/MBTiles/Aumento_temperaturas/municipios/{z}/{x}/{y}.pbf',
      ],
    },
    render: {
      layers: [
        {
          type: 'line',
          'source-layer': 'Aumento_temperaturas',
          featureState: {},
          paint: {
            'line-color': 'red',
            'line-opacity': '1',
            'line-width': '1',
          },
        },
      ],
    },
  },
];

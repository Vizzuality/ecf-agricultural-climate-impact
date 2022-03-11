export const DEFAULT_VIEWPORT = {
  zoom: 0,
  latitude: 0,
  longitude: 0,
  pitch: 0,
  bearing: 0,
  transitionDuration: 250,
  maxZoom: 22,
  minZoom: 1,
};

export const BOUNDS_SPAIN = [-9.38232421875, 35.92464453144099, 4.39453125, 43.89789239125797];

export const LAYERS = [
  {
    id: 'calentamiento',
    name: 'Proyecciones de calentamiento',
    type: 'vector',
    source: {
      type: 'vector',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/MBTiles/Aumento_temperaturas/{{geoType}}/{z}/{x}/{y}.vector.pbf',
      ],
      promoteId: '{{promoteId}}',
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'Aumento_temperaturas',
          featureState: {},
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', '{{promoteId}}'],
              1,
              '#0F031F',
              17,
              '#EEF07A',
            ],
          },
        },
        {
          type: 'line',
          'source-layer': 'Aumento_temperaturas',
          featureState: {
            id: 16,
            source: 'calentamiento',
            sourceLayer: 'Aumento_temperaturas',
          },
          paint: {
            'line-width': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0],
            'line-color': '#000',
          },
        },
        {
          type: 'line',
          'source-layer': 'Aumento_temperaturas',
          featureState: {},
          paint: {
            'line-width': ['case', ['boolean', ['feature-state', 'click'], false], 1, 0],
            'line-color': 'red',
          },
        },
      ],
    },
  },
];

export const LAYER_GRADIENT = [
  {
    color: '#0F031F',
    value: '1',
  },
  {
    color: '#701360',
    value: '1.25',
  },
  {
    color: '#C6434A',
    value: '1.5',
  },
  {
    color: '#F07D24',
    value: '1.75',
  },
  {
    color: '#EEF07A',
    value: '2',
  },
];

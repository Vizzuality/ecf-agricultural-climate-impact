export const DEFAULT_VIEWPORT = {
  zoom: 0,
  latitude: 0,
  longitude: 0,
  pitch: 0,
  bearing: 0,
  transitionDuration: 250,
  maxZoom: 10,
  minZoom: 5,
};

export const BOUNDS_SPAIN = [-9.38232421875, 35.92464453144099, 4.39453125, 43.89789239125797];
export const BBOX_SPAIN = [
  [-9.38232421875, 35.92464453144099],
  [4.39453125, 43.89789239125797],
];

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
          layout: {
            visibility: '{{visibility}}',
          },
          paint: {
            'fill-color': [
              'case',
              ['has', 'value_{{scenario}}_{{year}}'],
              [
                'interpolate',
                ['linear'],
                ['get', 'value_{{scenario}}_{{year}}'],
                1,
                '#0F031F',
                2,
                '#C6434A',
                3,
                '#F07D24',
                4,
                '#EEF07A',
              ],
              'transparent',
            ],
            'fill-opacity': 0.7,
          },
        },
        {
          type: 'line',
          'source-layer': 'Aumento_temperaturas',
          // featureState: {
          //   id: 16,
          //   source: 'calentamiento',
          //   sourceLayer: 'Aumento_temperaturas',
          // },
          layout: {
            visibility: '{{visibility}}',
          },
          paint: {
            'line-width': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0],
            'line-color': '#000',
          },
        },
      ],
    },
  },
  {
    id: 'sequias',
    name: 'Duración de las sequías a lo largo del ano',
    type: 'vector',
    source: {
      type: 'vector',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/MBTiles/Duracion_sequias/{{geoType}}/{z}/{x}/{y}.vector.pbf',
      ],
      promoteId: '{{promoteId}}',
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'Duracion_sequias',
          featureState: {},
          layout: {
            visibility: '{{visibility}}',
          },
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'value_{{scenario}}_{{year}}'],
              0,
              '#057FFA',
              50,
              '#FECC4D',
              100,
              '#790B0B',
            ],
            'fill-opacity': 0.7,
          },
        },
        {
          type: 'line',
          'source-layer': 'Duracion_sequias',
          featureState: {},
          layout: {
            visibility: '{{visibility}}',
          },
          paint: {
            'line-width': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0],
            'line-color': '#000',
          },
        },
      ],
    },
  },
];

export const LAYER_GRADIENT_CALENTAMIENTO = [
  {
    color: '#0F031F',
    value: '<1',
  },
  {
    color: '#C6434A',
    value: '2',
  },
  {
    color: '#F07D24',
    value: '3',
  },
  {
    color: '#EEF07A',
    value: '>4',
  },
];

export const LAYER_GRADIENT_SEQUIAS = [
  {
    color: '#057FFA',
    value: '0',
  },
  {
    color: '#FECC4D',
    value: '50',
  },
  {
    color: '#790B0B',
    value: '100',
  },
];

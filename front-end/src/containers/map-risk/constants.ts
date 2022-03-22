export const DEFAULT_VIEWPORT = {
  zoom: 0,
  latitude: 0,
  longitude: 0,
  pitch: 0,
  bearing: 0,
  transitionDuration: 250,
  maxZoom: 15,
  minZoom: 5,
};

export const BOUNDS_SPAIN = [-9.38232421875, 35.92464453144099, 4.39453125, 43.89789239125797];
export const BOUNDS_ANDALUCIA = [
  -7.6025390625, 35.96022296929667, -1.5380859375, 38.81403111409755,
];
// export const BBOX_SPAIN = [
//   [-9.38232421875, 35.92464453144099],
//   [4.39453125, 43.89789239125797],
// ];

export const LAYERS = [
  {
    id: 'crops',
    name: 'Mapa de Cultivos',
    type: 'vector',
    source: {
      type: 'vector',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/MBTiles/Mapa_cultivos/{z}/{x}/{y}.vector.pbf',
      ],
      promoteId: '{{promoteId}}',
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'Mapa_cultivos',
          featureState: {
            id: 16,
            source: 'crops',
            sourceLayer: 'Mapa_cultivos',
          },
          layout: {
            visibility: '{{visibility}}',
          },
          paint: {
            'fill-color': [
              'match',
              ['get', 'value'],
              'Dehesa',
              '#38A6A5',
              'Cereal',
              '#EDAD08',
              'Viñedo',
              '#AE240F',
              '#90A070', // otherwise (= "Olivar")
            ],
            'fill-opacity': 0.7,
          },
        },
        {
          type: 'line',
          'source-layer': 'Mapa_cultivos',
          featureState: {
            id: 16,
            source: 'crops',
            sourceLayer: 'Mapa_cultivos',
          },
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
    id: 'optimal_zones',
    name: 'Cambios en zonas óptimas',
    type: 'raster',
    source: {
      type: 'raster',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/RasterTiles/olivar/Arenas_Castro/{year}/{z}/{x}/{y}.png',
      ],
      minzoom: 3,
      maxzoom: 12,
    },
    render: {
      layers: [
        {
          type: 'raster',
          layout: {
            visibility: '{{visibility}}',
          },
        },
      ],
    },
  },
  {
    id: 'rendimiento-olivo',
    name: 'Rendimiento Olivo',
    type: 'vector',
    source: {
      type: 'vector',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/MBTiles/Proyecciones_rendimiento_olivar/{{geoType}}/{z}/{x}/{y}.vector.pbf',
      ],
      promoteId: '{{promoteId}}',
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'Proyecciones_rendimiento_olivar',
          featureState: {
            id: 16,
            source: 'rendimiento-olivo',
            sourceLayer: 'Proyecciones_rendimiento_olivar',
          },
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
                -35,
                '#F52D00',
                -10,
                '#FFFFF5',
                15,
                '#018571',
              ],
              'transparent',
            ],
            'fill-opacity': 0.7,
          },
        },
        {
          type: 'line',
          'source-layer': 'Proyecciones_rendimiento_olivar',
          featureState: {
            id: 16,
            source: 'rendimiento-olivo',
            sourceLayer: 'Proyecciones_rendimiento_olivar',
          },
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

export const LEGEND_ITEMS = [
  {
    color: '#90A070',
    value: 'Olivar',
  },
  {
    color: '#AE240F',
    value: 'Viñedo',
  },
  {
    color: '#EDAD08',
    value: 'Cereales',
  },
  {
    color: '#38A6A5',
    value: 'Dehesa',
  },
];

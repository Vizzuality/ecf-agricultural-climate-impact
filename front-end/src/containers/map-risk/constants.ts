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
  {
    id: 'rendimiento-cereal',
    name: 'Rendimiento Cereales',
    type: 'vector',
    source: {
      type: 'vector',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/MBTiles/Proyecciones_rendimiento_cereal/comunidades_autonomas/{z}/{x}/{y}.vector.pbf ',
      ],
      promoteId: '{{promoteId}}',
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'Proyecciones_rendimiento_cereal',
          featureState: {
            id: 16,
            source: 'rendimiento-cereal',
            sourceLayer: 'Proyecciones_rendimiento_cereal',
          },
          layout: {
            visibility: '{{visibility}}',
          },
          paint: {
            'fill-color': [
              'case',
              ['has', 'value_{{scenario}}_{{crop}}'],
              [
                'interpolate',
                ['linear'],
                ['get', 'value_{{scenario}}_{{crop}}'],
                -25,
                'red',
                -6,
                'blue',
                12,
                'green',
              ],
              'transparent',
            ],
            'fill-opacity': 0.7,
          },
        },
        {
          type: 'line',
          'source-layer': 'Proyecciones_rendimiento_cereal',
          featureState: {
            id: 16,
            source: 'rendimiento-cereal',
            sourceLayer: 'Proyecciones_rendimiento_cereal',
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
    id: 'zonas-optimas-vino',
    name: 'Zonas óptimas vino',
    type: 'vector',
    source: {
      type: 'vector',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/MBTiles/dehesa_dry_spells/rejilla/{z}/{x}/{y}.vector.pbf',
      ],
      promoteId: '{{promoteId}}',
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'dehesa_dry_spells',
          featureState: {
            id: 16,
            source: 'zonas-optimas-vino',
            sourceLayer: 'dehesa_dry_spells',
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
                1,
                '#E6E4E1',
                12,
                '#4E6605',
              ],
              'transparent',
            ],
            'fill-opacity': 0.7,
          },
        },
        {
          type: 'line',
          'source-layer': 'dehesa_dry_spells',
          featureState: {
            id: 16,
            source: 'zonas-optimas-vino',
            sourceLayer: 'dehesa_dry_spells',
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
    id: 'sequias-dehesa',
    name: 'Zonas sequías dehesa',
    type: 'vector',
    source: {
      type: 'vector',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/MBTiles/Indicadores_dehesa/dehesa_dry_spells/{z}/{x}/{y}.vector.pbf',
      ],
      promoteId: '{{promoteId}}',
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'Indicadores_dehesa',
          featureState: {
            id: 16,
            source: 'sequias-dehesa',
            sourceLayer: 'Indicadores_dehesa',
          },
          // layout: {
          //   visibility: '{{visibility}}',
          // },
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'value_{{scenario}}_{{year}}'],
              0,
              '#8bbdce',
              15,
              '#b9d09e',
              30,
              '#e6e36d',
              45,
              '#fdd74d',
              60,
              '#fead3d',
              75,
              '#ff822d',
            ],
            'fill-opacity': 0.7,
          },
        },
        {
          type: 'line',
          'source-layer': 'Indicadores_dehesa',
          featureState: {
            id: 16,
            source: 'sequias-dehesa',
            sourceLayer: 'Indicadores_dehesa',
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

export const LEGEND_ITEMS_CULTIVOS = [
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

export const LEGEND_ITEMS_RENDIMIENTO = [
  {
    color: '#F52D00',
    value: 'MIN',
  },
  {
    color: '#FFFFF5',
    value: 'MIDDLE',
  },
  {
    color: '#018571',
    value: 'MAX',
  },
];

export const LEGEND_ITEMS_ZONAS_OPTIMAS_OLIVO = [
  {
    color: '#E6E4E1',
    value: '0',
  },
  {
    color: '#D2D2CE',
    value: '250',
  },
  {
    color: '#9BAC7C',
    value: '500',
  },
  {
    color: '#709010',
    value: '750',
  },
  {
    color: '#4E6605',
    value: '1000',
  },
];

export const LEGEND_ITEMS_ZONAS_OPTIMAS_VINO = [
  {
    color: '#E6E4E1',
    value: '0',
  },
  {
    color: '#D2D2CE',
    value: '250',
  },
  {
    color: '#9BAC7C',
    value: '500',
  },
  {
    color: '#709010',
    value: '750',
  },
  {
    color: '#4E6605',
    value: '1000',
  },
];

export const LAYER_GRADIENT_SEQUIAS_DEHESA = [
  {
    color: '#8bbdce',
    value: '0',
  },
  {
    color: '#b9d09e',
    value: '15',
  },
  {
    color: '#e6e36d',
    value: '30',
  },
  {
    color: '#fdec55',
    value: '',
  },
  {
    color: '#fdd74d',
    value: '45',
  },
  {
    color: '#fead3d',
    value: '60',
  },

  {
    color: '#ff822d',
    value: '75',
  },
];

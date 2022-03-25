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
export const BOUNDS_ANDALUCIA = [
  -7.6025390625, 35.96022296929667, -1.5380859375, 38.81403111409755,
];
// export const BBOX_SPAIN = [
//   [-9.38232421875, 35.92464453144099],
//   [4.39453125, 43.89789239125797],
// ];

export const LAYERS = [
  {
    id: 'cultivos',
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
            source: 'cultivos',
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
                -20,
                '#F52D00',
                -0,
                '#FFFFF5',
                20,
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
                -20,
                '#F52D00',
                -0,
                '#FFFFF5',
                20,
                '#018571',
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
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/MBTiles/Zonas_alto_potencial_climático_viñedo/rejilla/{z}/{x}/{y}.vector.pbf',
      ],
      promoteId: '{{promoteId}}',
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'Zonas_alto_potencial_climático_viñedo',
          featureState: {
            id: 16,
            source: 'zonas-optimas-vino',
            sourceLayer: 'Zonas_alto_potencial_climático_viñedo',
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
          'source-layer': 'Zonas_alto_potencial_climático_viñedo',
          featureState: {
            id: 16,
            source: 'zonas-optimas-vino',
            sourceLayer: 'Zonas_alto_potencial_climático_viñedo',
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
  {
    id: 'incendios-dehesa',
    name: 'Zonas incendios dehesa',
    type: 'vector',
    source: {
      type: 'vector',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/MBTiles/Indicadores_dehesa/dehesa_fire_danger/{z}/{x}/{y}.vector.pbf',
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
            source: 'incendios-dehesa',
            sourceLayer: 'Indicadores_dehesa',
          },
          layout: {
            visibility: '{{visibility}}',
          },
          paint: {
            'fill-color': [
              'match',
              ['get', 'value_{{scenario}}_{{year}}'],
              'Muy bajo',
              '#FFFFB2',
              'Bajo',
              '#FECC5C',
              'Medio',
              '#FD8D3C',
              'Alto',
              '#F03B20',
              'Muy Alto',
              '#BD0026',
              'Extermo',
              'black',
              'transparent', // otherwise (= "Extremo")
            ],
            'fill-opacity': 0.7,
          },
        },
        {
          type: 'line',
          'source-layer': 'Indicadores_dehesa',
          featureState: {
            id: 16,
            source: 'incendios-dehesa',
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
  {
    id: 'aridez',
    name: 'Aridez',
    type: 'vector',
    source: {
      type: 'vector',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/MBTiles/Aridez/{{geoType}}/{z}/{x}/{y}.vector.pbf',
      ],
      promoteId: '{{promoteId}}',
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'Aridez',
          layout: {
            visibility: '{{visibility}}',
          },
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'value_{{scenario}}_{{year}}'],
              0.1,
              '#057FFA',
              0.3,
              '#FECC4D',
              0.6,
              '#790B0B',
            ],
            'fill-opacity': 0.7,
          },
        },
        {
          type: 'line',
          'source-layer': 'Aridez',
          // source: 'aridez',
          // featureState: {
          //   id: 16,
          //   sourceLayer: 'Aridez',
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
    id: 'precipitacion',
    name: 'Precipitacion',
    type: 'vector',
    source: {
      type: 'vector',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/MBTiles/Precipitacion_trimestre_mas_humedo/{{geoType}}/{z}/{x}/{y}.vector.pbf',
      ],
      promoteId: '{{promoteId}}',
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'Precipitacion_trimestre_mas_humedo',
          layout: {
            visibility: '{{visibility}}',
          },
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'value_{{scenario}}_{{year}}'],
              0,
              '#F2F0F4',
              0.000000025,
              '#BDC9E0',
              0.00000005,
              '#74A9CF',
              0.000000075,
              '#226F96',
              0.0000001,
              '#034063',
            ],
            'fill-opacity': 0.7,
          },
        },
        {
          type: 'line',
          'source-layer': 'Precipitacion_trimestre_mas_humedo',
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
    value: '-20%',
  },
  {
    color: '#FFFFF5',
    value: '-10%',
  },
  {
    color: '#018571',
    value: '20%',
  },
];

export const LEGEND_ITEMS_ZONAS_OPTIMAS_OLIVO = [
  {
    color: '#E6E4E1',
    value: '0',
  },
  {
    color: '#D2D2CE',
    value: '3',
  },
  {
    color: '#9BAC7C',
    value: '6',
  },
  {
    color: '#709010',
    value: '9',
  },
  {
    color: '#4E6605',
    value: '12',
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

export const LAYER_GRADIENT_INCENDIOS_DEHESA = [
  {
    color: '#FFFFB2',
    value: 'Muy bajo',
  },
  {
    color: '#FECC5C',
    value: 'Bajo',
  },
  {
    color: '#FD8D3C',
    value: 'Medio',
  },
  {
    color: '#F03B20',
    value: 'Alto',
  },
  {
    color: '#BD0026',
    value: 'Muy Alto',
  },
];

export const LAYER_GRADIENT_ARIDEZ = [
  {
    color: '#057FFA',
    value: '0.1',
  },
  {
    color: '#FECC4D',
    value: '0.3',
  },
  {
    color: '#790B0B',
    value: '0.6',
  },
];

export const LEGEND_ITEMS_PRECIPITACION = [
  {
    color: '#F2F0F4',
    value: '0',
  },
  {
    color: '#BDC9E0',
    value: '250',
  },
  {
    color: '#74A9CF',
    value: '500',
  },
  {
    color: '#226F96',
    value: '750',
  },
  {
    color: '#034063',
    value: '1000',
  },
];

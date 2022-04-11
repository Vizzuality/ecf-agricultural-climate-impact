export const DEFAULT_VIEWPORT = {
  zoom: 0,
  latitude: 0,
  longitude: 0,
  pitch: 0,
  bearing: 0,
  transitionDuration: 250,
  maxZoom: 10,
  minZoom: 4,
};

export const BOUNDS = {
  spain: [-9.38232421875, 35.92464453144099, 4.39453125, 43.89789239125797],
  andalucia: [-7.6025390625, 35.96022296929667, -1.5380859375, 38.81403111409755],
  castilla_leon: [-7.2125244140625, 40.04864272291728, -1.6644287109375, 43.29320031385282],
  castilla_la_mancha: [
    -5.482177734374983, 37.974514992024616, -0.8239746093749835, 41.36031866306708,
  ],
  extremadura: [-7.62451171875, 37.92686760148135, -4.592285156249999, 40.534676780615406],
};

// export const BOUNDS_SPAIN = [-9.38232421875, 35.92464453144099, 4.39453125, 43.89789239125797];
// export const BOUNDS_ANDALUCIA = [
//   -7.6025390625, 35.96022296929667, -1.5380859375, 38.81403111409755,
// ];
// export const BOUNDS_CASTILLA_LEON = [
//   -7.2125244140625, 40.04864272291728, -1.6644287109375, 43.29320031385282,
// ];

export const CCAA_DICTIONARY = {
  andalucia: 'Andalucía',
  castilla_leon: 'Castilla y León',
  castilla_la_mancha: 'Castilla La Mancha',
  extremadura: 'Extremadura',
};

export const LAYERS = [
  // calentamiento
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
  // sequias
  {
    id: 'sequias',
    name: 'Duración de las sequías a lo largo del año',
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
          paint: {
            'line-width': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0],
            'line-color': '#000',
          },
        },
      ],
    },
  },
  // cultivos
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
    id: 'cultivos-dehesa',
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
          paint: {
            'fill-color': ['match', ['get', 'value'], 'Dehesa', '#38A6A5', 'transparent'],
            'fill-opacity': 0.7,
          },
        },
      ],
    },
  },
  {
    id: 'cultivos-cereal',
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
          paint: {
            'fill-color': ['match', ['get', 'value'], 'Cereal', '#EDAD08', 'transparent'],
            'fill-opacity': 0.7,
          },
        },
      ],
    },
  },
  {
    id: 'cultivos-vinedo',
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
          paint: {
            'fill-color': ['match', ['get', 'value'], 'Viñedo', '#AE240F', 'transparent'],
            'fill-opacity': 0.7,
          },
        },
      ],
    },
  },
  {
    id: 'cultivos-olivar',
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
          paint: {
            'fill-color': ['match', ['get', 'value'], 'Olivar', '#90A070', 'transparent'],
            'fill-opacity': 0.7,
          },
        },
      ],
    },
  },
  // zonas-optimas-olivo
  {
    id: 'zonas-optimas-olivo_1961_2000',
    name: 'Cambios en zonas óptimas',
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
    id: 'zonas-optimas-olivo_2011_2040',
    name: 'Cambios en zonas óptimas',
    type: 'raster',
    source: {
      type: 'raster',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/RasterTiles/olivar/Arenas_Castro/2011_2040/{z}/{x}/{y}.png',
      ],
      minzoom: 3,
      maxzoom: 12,
    },
  },
  {
    id: 'zonas-optimas-olivo_2041_2070',
    name: 'Cambios en zonas óptimas',
    type: 'raster',
    source: {
      type: 'raster',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/RasterTiles/olivar/Arenas_Castro/2041_2070/{z}/{x}/{y}.png',
      ],
      minzoom: 3,
      maxzoom: 12,
    },
  },
  {
    id: 'zonas-optimas-olivo_2071_2100',
    name: 'Cambios en zonas óptimas',
    type: 'raster',
    source: {
      type: 'raster',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/RasterTiles/olivar/Arenas_Castro/2071_2100/{z}/{x}/{y}.png',
      ],
      minzoom: 3,
      maxzoom: 12,
    },
  },
  // rendimiento-olivo
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
          paint: {
            'line-width': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0],
            'line-color': '#000',
          },
        },
      ],
    },
  },
  // rendimiento-cereal
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
          // featureState: {
          //   id: 16,
          //   source: 'rendimiento-cereal',
          //   sourceLayer: 'Proyecciones_rendimiento_cereal',
          // },
          // layout: {
          //   visibility: '{{visibility}}',
          // },
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
          // featureState: {
          //   id: 16,
          //   source: 'rendimiento-cereal',
          //   sourceLayer: 'Proyecciones_rendimiento_cereal',
          // },
          // layout: {
          //   visibility: '{{visibility}}',
          // },
          paint: {
            'line-width': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0],
            'line-color': '#000',
          },
        },
      ],
    },
  },
  // zonas-optimas-vino
  {
    id: 'zonas-optimas-vino_zonas_alto_potencial_climático',
    name: 'Zonas óptimas vino',
    type: 'vector',
    source: {
      type: 'vector',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/MBTiles/Zonas_alto_potencial_climático_viñedo/zonas_alto_potencial_climático/{z}/{x}/{y}.vector.pbf',
      ],
      promoteId: '{{promoteId}}',
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'zonas_alto_potencial_climático',
          paint: {
            'fill-color': [
              'match',
              ['get', 'value_{{scenario}}_{{year}}'],
              '0.0',
              'black',
              '1.0',
              'transparent',
              'black',
            ],
            'fill-opacity': 0.7,
          },
        },
      ],
    },
  },
  {
    id: 'zonas-optimas-vino_indice_frescor_nocturno',
    name: 'Zonas óptimas vino',
    type: 'vector',
    source: {
      type: 'vector',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/MBTiles/Zonas_alto_potencial_climático_viñedo/indice_frescor_nocturno/{z}/{x}/{y}.vector.pbf',
      ],
      promoteId: '{{promoteId}}',
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'indice_frescor_nocturno',
          paint: {
            'fill-color': [
              'match',
              ['get', 'value_{{scenario}}_{{year}}'],
              'Muy fresco',
              '#2C7BB6',
              'Fresco',
              '#ABD9E9',
              'Templado',
              '#FFFFBF',
              'Cálido',
              '#FDAE61',
              'transparent',
            ],
            'fill-opacity': 1,
          },
        },
      ],
    },
  },
  {
    id: 'zonas-optimas-vino_indice_sequia',
    name: 'Zonas óptimas vino',
    type: 'vector',
    source: {
      type: 'vector',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/MBTiles/Zonas_alto_potencial_climático_viñedo/indice_sequia/{z}/{x}/{y}.vector.pbf',
      ],
      promoteId: '{{promoteId}}',
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'indice_sequia',
          paint: {
            'fill-color': [
              'match',
              ['get', 'value_{{scenario}}_{{year}}'],
              'Muy seco',
              '#7D100D',
              'Seco',
              '#D18B37',
              'Moderadamente seco',
              '#FACB50',
              'Sub húmedo',
              '#679DB6',
              'Húmedo',
              '#0980F8',
              'transparent',
            ],
            'fill-opacity': 1,
          },
        },
      ],
    },
  },
  {
    id: 'zonas-optimas-vino_indice_huglin',
    name: 'Zonas óptimas vino',
    type: 'vector',
    source: {
      type: 'vector',
      tiles: [
        'https://storage.googleapis.com/ecf-agricultural-climate-impact/MBTiles/Zonas_alto_potencial_climático_viñedo/indice_huglin/{z}/{x}/{y}.vector.pbf',
      ],
      promoteId: '{{promoteId}}',
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'indice_huglin',
          paint: {
            'fill-color': [
              'match',
              ['get', 'value_{{scenario}}_{{year}}'],
              'Muy Fresco ',
              '#2C7BB6',
              'Fresco',
              '#ABD9E9',
              'Templado',
              '#D2EEAE',
              'Templado cálido',
              '#FFFFBF',
              'Cálido',
              '#FDAE61',
              'Muy cálido',
              '#D7191C',
              'transparent',
            ],
            'fill-opacity': 1,
          },
        },
      ],
    },
  },
  // sequias-dehesa
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
          paint: {
            'fill-color': [
              'match',
              ['get', 'value_{{scenario}}_{{year}}'],
              'Muy bajo',
              '#FFFFB2',
              'Bajo',
              '#FED976',
              'Medio',
              '#FEB24C',
              'Alto',
              '#FD8D3C',
              'Muy alto',
              '#F03B20',
              'Extremo',
              '#BD0026',
              'transparent', // hide if no value
            ],
            'fill-opacity': 0.7,
          },
        },
        {
          type: 'line',
          'source-layer': 'Indicadores_dehesa',
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
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'value_{{scenario}}_{{year}}'],
              0,
              '#057FFA',
              0.5,
              '#FECC4D',
              1,
              '#790B0B',
            ],
            'fill-opacity': 0.7,
          },
        },
        {
          type: 'line',
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
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'value_{{scenario}}_{{year}}'],
              0,
              '#F2F0F4',
              100,
              '#BDC9E0',
              200,
              '#74A9CF',
              300,
              '#226F96',
              400,
              '#034063',
            ],
            'fill-opacity': 0.7,
          },
        },
        {
          type: 'line',
          'source-layer': 'Precipitacion_trimestre_mas_humedo',
          paint: {
            'line-width': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0],
            'line-color': '#000',
          },
        },
      ],
    },
  },
];

export const LEGEND_ITEMS_CALENTAMIENTO = [
  {
    color: '#0F031F',
    value: '1',
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
    value: '4',
  },
];

export const LEGEND_ITEMS_SEQUIAS = [
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
    value: '0%',
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

export const LEGEND_ITEMS_ZONAS_OPTIMAS_VINO_INDICE_FRESCOR_NOCTURNO = [
  {
    color: '#2C7BB6',
    value: 'Muy fresco',
  },
  {
    color: '#ABD9E9',
    value: 'Fresco',
  },
  {
    color: '#FFFFBF',
    value: 'Templado',
  },
  {
    color: '#FDAE61',
    value: 'Cálido',
  },
];

export const LEGEND_ITEMS_ZONAS_OPTIMAS_VINO_INDICE_HUGLIN = [
  {
    color: '#2C7BB6',
    value: 'Muy Fresco',
  },
  {
    color: '#ABD9E9',
    value: 'Fresco',
  },
  {
    color: '#D2EEAE',
    value: 'Templado',
  },
  {
    color: '#FFFFBF',
    value: 'Templado cálido',
  },
  {
    color: '#FDAE61',
    value: 'Cálido',
  },
  {
    color: '#D7191C',
    value: 'Muy cálido',
  },
];

export const LEGEND_ITEMS_ZONAS_OPTIMAS_VINO_INDICE_SEQUIA = [
  {
    color: '#7D100D',
    value: 'Muy seco',
  },
  {
    color: '#D18B37',
    value: 'Seco',
  },
  {
    color: '#FACB50',
    value: 'Moderadamente seco',
  },
  {
    color: '#679DB6',
    value: 'Sub húmedo',
  },
  {
    color: '#0980F8',
    value: 'Húmedo',
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
    color: '#FED976',
    value: 'Bajo',
  },
  {
    color: '#FEB24C',
    value: 'Medio',
  },
  {
    color: '#FD8D3C',
    value: 'Alto',
  },
  {
    color: '#F03B20',
    value: 'Muy alto',
  },
  {
    color: '#BD0026',
    value: 'Extremo ',
  },
];

export const LAYER_GRADIENT_ARIDEZ = [
  {
    color: '#057FFA',
    value: '0',
  },
  {
    color: '#FECC4D',
    value: '0.5',
  },
  {
    color: '#790B0B',
    value: '1',
  },
];

export const LEGEND_ITEMS_PRECIPITACION = [
  {
    color: '#F2F0F4',
    value: '0',
  },
  {
    color: '#BDC9E0',
    value: '100',
  },
  {
    color: '#74A9CF',
    value: '200',
  },
  {
    color: '#226F96',
    value: '300',
  },
  {
    color: '#034063',
    value: '400',
  },
];

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
    type: 'layer',
    id: 'mosaic-land-cover-and-land-use-2000',
    attributes: {
      name: '2000 Land Cover',
      description:
        'Global composite land cover map of 2000 with 9 classes shown. Unknown and ocean classes are not shown.',
      dataset: 'mosaic-land-cover-and-land-use-2000',
      provider: 'leaflet',
      type: 'raster',
      layerConfig: {},
      source: {
        tiles: ['https://storage.googleapis.com/lcl_tiles/GLCLU2020/composite2000/{z}/{x}/{y}.png'],
        minzoom: 1,
        maxzoom: 12,
      },
      legendConfig: {
        items: [
          {
            color: '#FEFECC',
            name: 'Bare Ground',
            id: 0,
          },
          {
            color: '#B9B91E',
            name: 'Short Vegetation',
            id: 1,
          },
          {
            color: '#347834',
            name: 'Forest',
            id: 2,
          },
          {
            color: '#0D570D',
            name: 'Tall Forest (20m+)',
            id: 3,
          },
          {
            color: '#88CAAD',
            name: 'Wetland - Short Vegetation',
            id: 4,
          },
          {
            color: '#589558',
            name: 'Wetland - Forest',
            id: 5,
          },
          {
            color: '#6baed6',
            name: 'Water',
            id: 6,
          },
          {
            color: '#acd1e8',
            name: 'Snow/Ice',
            id: 7,
          },
          {
            color: '#fff183',
            name: 'Cropland',
            id: 8,
          },
          {
            color: '#e8765d',
            name: 'Built-up Area',
            id: 9,
          },
        ],
        type: 'basic',
      },
    },
  },
];

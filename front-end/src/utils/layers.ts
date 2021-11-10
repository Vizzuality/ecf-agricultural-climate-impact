import groupBy from 'lodash/groupBy';

import { LayerParams } from 'store/features/layers';

import { Layer, LayerGroup } from 'types';

export const getLayerGroups = (layers: Layer[], layerParams: LayerParams) => {
  const layersByDataset = groupBy(layers, 'dataset');

  return Object.keys(layersByDataset).map((datasetKey): LayerGroup => {
    const hasHiddenLayers = layersByDataset[datasetKey].find(
      ({ id }) => layerParams[id]?.visibility === false,
    );

    return {
      id: datasetKey,
      dataset: datasetKey,
      visibility: !hasHiddenLayers,
      layers: layersByDataset[datasetKey].map((_layer) => ({
        ..._layer,
        active: Boolean(_layer.default),
        visibility: !hasHiddenLayers,
      })),
    };
  });
};

export default {
  getLayerGroups,
};

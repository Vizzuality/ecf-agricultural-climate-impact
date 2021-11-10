// import WRISerializer from 'wri-json-api-serializer';

import DATASETS from 'data/datasets.json';

import { Dataset } from 'types';

export function fetchDatasets() {
  return Promise.resolve(DATASETS);
}
export default {
  fetchDatasets,
};

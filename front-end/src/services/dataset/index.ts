import DATASETS from 'data/datasets.json';

export function fetchDatasets() {
  return Promise.resolve(DATASETS);
}

import { useMemo } from 'react';
import { useQueries, UseQueryResult } from 'react-query';

export type DatasetItem = {
  dataset: string;
  indicator: string;
  unit: string;
  value: number;
  year: number;
};

const fetchHistoricGHGData = () =>
  fetch(
    'https://storage.googleapis.com/ecf-agricultural-climate-impact/TabularData/historic_GHG_emissions_spain.json',
  ).then((response) => {
    return response.json();
  });

const fetchWewGHGData = () =>
  fetch(
    'https://storage.googleapis.com/ecf-agricultural-climate-impact/TabularData/projected_WeW_GHG_emissions_spain.json',
  ).then((response) => {
    return response.json();
  });

const fetchWawGHGData = () =>
  fetch(
    'https://storage.googleapis.com/ecf-agricultural-climate-impact/TabularData/projected_WaW_GHG_emissions_spain.json',
  ).then((response) => {
    return response.json();
  });

// TO-DO: type for data
export const useClimateRiskData = (): UseQueryResult<DatasetItem[]>[] => {
  const queries = useQueries([
    { queryKey: 'historic-ghg-data', queryFn: fetchHistoricGHGData, placeholderData: [] },
    { queryKey: 'wew-ghg-data', queryFn: fetchWewGHGData, placeholderData: [] },
    { queryKey: 'waw-ghg-data', queryFn: fetchWawGHGData, placeholderData: [] },
  ]);

  return useMemo<UseQueryResult<DatasetItem[]>[]>(() => queries, [queries]);
};

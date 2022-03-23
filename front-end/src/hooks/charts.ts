import { useMemo } from 'react';
import { useQueries, UseQueryResult } from 'react-query';

export type DatasetItem = {
  dataset: string;
  indicator: string;
  scenario: string;
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

const fetchTemperatureRCP45 = () =>
  fetch(
    'https://storage.googleapis.com/ecf-agricultural-climate-impact/TabularData/annual_average_temperature_rcp45_spain.json',
  ).then((response) => {
    return response.json();
  });

const fetchTemperatureRCP85 = () =>
  fetch(
    'https://storage.googleapis.com/ecf-agricultural-climate-impact/TabularData/annual_average_temperature_rcp85_spain.json',
  ).then((response) => {
    return response.json();
  });

export const useClimateRiskData = (): UseQueryResult<DatasetItem[]>[] => {
  const queries = useQueries([
    { queryKey: 'historic-ghg-data', queryFn: fetchHistoricGHGData, placeholderData: [] },
    { queryKey: 'wew-ghg-data', queryFn: fetchWewGHGData, placeholderData: [] },
    { queryKey: 'waw-ghg-data', queryFn: fetchWawGHGData, placeholderData: [] },
  ]);

  return useMemo<UseQueryResult<DatasetItem[]>[]>(() => queries, [queries]);
};

export const useTemperatureData = (): UseQueryResult<DatasetItem[]>[] => {
  const queries = useQueries([
    { queryKey: 'temperature-rcp45', queryFn: fetchTemperatureRCP45, placeholderData: [] },
    { queryKey: 'temperature-rcp85', queryFn: fetchTemperatureRCP85, placeholderData: [] },
  ]);

  return useMemo<UseQueryResult<DatasetItem[]>[]>(() => queries, [queries]);
};

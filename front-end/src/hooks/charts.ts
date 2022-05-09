import { useMemo } from 'react';
import { useQueries, UseQueryResult } from 'react-query';

export type Crop = 'cereal' | 'aceituna' | 'uva';
export type Scenario = 'rcp45' | 'rcp85';

export type DatasetItem = {
  dataset: string;
  indicator: string;
  scenario?: string;
  unit: string;
  value: number;
  year: number;
};

// TO-DO: review types for lists
const CROPS: Crop[] = ['cereal', 'aceituna', 'uva'];
const SCENARIOS: Scenario[] = ['rcp45', 'rcp85'];

const baseUrl = 'https://cambio-climatico.coag.com.es/storage';

const fetchHistoricGHGData = () =>
  fetch(`${baseUrl}/TabularData/historic_GHG_emissions_spain.json`).then((response) => {
    return response.json();
  });

const fetchWewGHGData = () =>
  fetch(`${baseUrl}/TabularData/projected_WeW_GHG_emissions_spain.json`).then((response) => {
    return response.json();
  });

const fetchWawGHGData = () =>
  fetch(`${baseUrl}/TabularData/projected_WaW_GHG_emissions_spain.json`).then((response) => {
    return response.json();
  });

const fetchTemperature = (scenario: Scenario) =>
  fetch(`${baseUrl}/TabularData/annual_average_temperature_${scenario}_spain.json`).then(
    (response) => {
      return response.json();
    },
  );

const fetchProduccionCultivo = (crop: Crop) =>
  fetch(`${baseUrl}/TabularData/serie_historica_produccion_${crop}_espa%C3%B1ola.json`).then(
    (response) => {
      return response.json();
    },
  );

export const useClimateRiskData = (): UseQueryResult<DatasetItem[]>[] => {
  const queries = useQueries([
    { queryKey: 'historic-ghg-data', queryFn: fetchHistoricGHGData, placeholderData: [] },
    { queryKey: 'wew-ghg-data', queryFn: fetchWewGHGData, placeholderData: [] },
    { queryKey: 'waw-ghg-data', queryFn: fetchWawGHGData, placeholderData: [] },
  ]);

  return useMemo<UseQueryResult<DatasetItem[]>[]>(() => queries, [queries]);
};

export const useTemperatureData = (): UseQueryResult<DatasetItem[]>[] => {
  const queries = useQueries(
    SCENARIOS.map((crop) => ({
      queryKey: `crop-${crop}`,
      queryFn: () => fetchTemperature(crop),
      placeholderData: [],
    })),
  );

  return useMemo<UseQueryResult<DatasetItem[]>[]>(() => queries, [queries]);
};

export const useProduccionesCultivos = (): UseQueryResult<DatasetItem[]>[] => {
  const queries = useQueries(
    CROPS.map((crop) => ({
      queryKey: `crop-${crop}`,
      queryFn: () => fetchProduccionCultivo(crop),
      placeholderData: [],
    })),
  );

  return useMemo<UseQueryResult<DatasetItem[]>[]>(() => queries, [queries]);
};

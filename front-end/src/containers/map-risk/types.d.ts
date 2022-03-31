import { StringNullableChain } from 'lodash';

export interface ScenarioType {
  value: string;
  label: string;
}
export interface YearType {
  value: string;
  label: string;
}
export interface CropType {
  value: string;
  label: string;
}
export interface MunicipalityType {
  id: number;
  name: string;
}
export interface IndicatorType {
  value: string;
  label: string;
}

export interface MapVisualizationType {
  activeLayerId?: string;
  geoType?: string;
  scenario?: ScenarioType;
  year?: YearType;
  municipality?: MunicipalityType;
  allowZoom?: boolean;
  bounds?: string;
  legend?: string;
  crop?: CropType;
  indicator?: IndicatorType;
}
export interface ViewPortTypes {
  zoom?: number;
  pitch?: number;
  longitude?: number;
  latitude: number;
}

export interface TooltipData {
  // dataset: string;
  // indicator: string;
  title: string;
  value: number;
  // year: number;
  unit: string;
}

export interface EventTypes {
  id?: number;
  source?: string;
}

export interface MapTypes {
  setFeatureState: function;
}

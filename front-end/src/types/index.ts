export enum SectionIDs {
  CultivoCulturaCambio = 'cultivo-cultura-cambio',
  ElRiesgoClimatico = 'el-riesgo-climatico',
  ElRiesgoAgricola = 'el-riesgo-agricola',
  CultivoCulturaResiliencia = 'cultivo-cultura-resiliencia',
}

export enum SubsectionIDs {
  Vinedo = 'section-vinedo',
  Cereales = 'section-cereal',
  Olivar = 'section-olivar',
  Dehesa = 'section-dehesa',
}

export interface SectionObject {
  id: SectionIDs;
  label: string;
  url: string;
  subsections?: SubsectionObject[];
}

export interface SubsectionObject {
  id: SubsectionIDs;
  label: string;
  url: string;
}

export interface AppContextType {
  currentSection: SectionIDs;
  setCurrentSection?: (section: SectionIDs) => void;
  // currentSubsection: SubsectionIDs;
  // setCurrentSubsection?: (subsection: SubsectionIDs) => void;
}

export interface LegendConfigItem {
  value: string;
  color: string;
}

export interface LegendConfig {
  id: string;
  name: string;
  description?: string;
  icon?: Element;
  type?: string;
  items?: LegendConfigItem[];
}

export interface LayerGroup {
  id: string;
  dataset: string;
  visibility: boolean;
  layers: ActivableLayer[];
}

export interface ActivableLayer extends Layer {
  active: boolean;
}

export interface Layer {
  id: string;
  name: string;
  default?: boolean;
  description?: string;
  legendConfig: LegendConfig[];
}

export interface Dataset {
  id: string;
  name: string;
  layer: Layer[];
}

export interface BasemapOptions {
  attribution: string;
}

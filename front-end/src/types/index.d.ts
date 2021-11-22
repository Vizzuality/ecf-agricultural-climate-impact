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
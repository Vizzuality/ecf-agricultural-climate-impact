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

export interface Widget {
  id: string;
  default?: boolean;
}

interface MetadataInfo {
  name?: string;
  technical_title?: string;
  functions?: string;
  cautions?: string;
  citations?: string;
  license?: string;
  license_link?: string;
  geographic_coverage?: string;
  spatial_resolution?: string;
  date_of_content?: string;
  learn_more_link?: string;
  data_download_original_link?: string;
  data_download_link?: string;
  sources?: List<MetadataInfoSource>;
}

interface MetadataInfoSource {
  'source-name'?: string;
  id: number;
  'source-description'?: string;
}

export interface DatasetMetadata {
  name: string;
  description?: string;
  source?: string;
  info: MetadataInfo;
}
export interface Dataset {
  id: string;
  active?: boolean;
  name: string;
  layer: Layer[];
  widget: Widget[];
  metadata: DatasetMetadata[];
  dataLastUpdated: string;
}

export interface BasemapOptions {
  attribution: string;
}

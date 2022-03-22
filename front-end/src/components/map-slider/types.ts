export interface MapSliderValueType {
  value: string;
  label: string;
}

export interface MapSliderType {
  values: MapSliderValueType[];
  value: MapSliderValueType;
  currentValue?: number;
  onChange: (e: any) => void;
}

export interface BasemapControlProps {
  basemap: string;
  labels: PropTypes.object;
  boundaries: PropTypes.bool;
  onChangeBasemap: (basemap) => void;
  onChangeLabels: (labels) => void;
  onChangeBoundaries: (boundaries) => void;
}

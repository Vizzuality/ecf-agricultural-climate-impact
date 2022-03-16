import { FC } from 'react';
import ReactSlider from 'react-slider';

import type { MapSliderType } from './types';

export const MapSlider: FC<MapSliderType> = ({ values, value, currentValue, onChange }) => {
  return (
    <div>
      <ReactSlider
        className="h-px my-5 bg-black cursor-grab"
        min={0}
        max={values.length - 1}
        thumbClassName="w-10 h-10 flex items-center justify-center rounded-full outline-none bg-white border border-black text-sm top-px transform -translate-y-1/2"
        onChange={onChange}
        value={currentValue}
        renderThumb={(props) => <div {...props}>{value.label}</div>}
      />
    </div>
  );
};

export default MapSlider;

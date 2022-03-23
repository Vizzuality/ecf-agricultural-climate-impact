import { FC } from 'react';
import cx from 'classnames';
import ReactSlider from 'react-slider';

import type { MapSliderType } from './types';

export const MapSlider: FC<MapSliderType> = ({
  values,
  value,
  currentValue,
  onChange,
  disabled = false,
}) => {
  return (
    <div>
      <ReactSlider
        // className=_"h-px my-5 bg-black cursor-grab"
        className={cx({
          'h-px my-5': true,
          'cursor-grab bg-black': !disabled,
          'cursor-default bg-gray-500': !!disabled,
        })}
        min={0}
        max={values.length - 1}
        // thumbClassName="w-10 h-10 flex items-center justify-center rounded-full outline-none bg-white border border-black text-sm top-px transform -translate-y-1/2"
        thumbClassName={cx({
          'w-10 h-10 flex items-center justify-center rounded-full outline-none bg-white border text-sm top-px transform -translate-y-1/2':
            true,
          'border-black': !disabled,
          'border-gray-400 text-gray-400 ': !!disabled,
        })}
        onChange={onChange}
        value={currentValue}
        disabled={disabled}
        renderThumb={(props) => <div {...props}>{value.label}</div>}
      />
    </div>
  );
};

export default MapSlider;

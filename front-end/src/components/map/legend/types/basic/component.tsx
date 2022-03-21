import { FC } from 'react';

import cx from 'classnames';

import type { LegendTypeBasicProps } from './types';

export const LegendTypeBasic: FC<LegendTypeBasicProps> = ({
  className = '',
  items,
}: LegendTypeBasicProps) => (
  <div
    className={cx({
      [className]: !!className,
    })}
  >
    <ul className="flex flex-wrap w-full">
      {items.map(({ value, color }) => (
        <li key={`${value}`} className="flex w-1/2 py-1 space-x-2 text-xs">
          <div
            className="flex-shrink-0 w-3 h-3 mt-0.5 rounded-full"
            style={{
              backgroundColor: color,
            }}
          />
          <div className="uppercase">{value}</div>
        </li>
      ))}
    </ul>
  </div>
);

export default LegendTypeBasic;

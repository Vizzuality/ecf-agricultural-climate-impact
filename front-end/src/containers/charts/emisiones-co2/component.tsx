import { FC, useState } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

// utils
// import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// components
import Chart from './chart';

export const Chart1: FC = () => (
  <ParentSize>{({ width }) => <Chart width={width} height={300} />}</ParentSize>
);

export default Chart1;

import ParentSize from '@visx/responsive/lib/components/ParentSize';

// components
import Chart from './chart';

export const Chart1: React.FC = () => (
  <ParentSize>{({ width }) => <Chart width={width} height={300} />}</ParentSize>
);

export default Chart1;

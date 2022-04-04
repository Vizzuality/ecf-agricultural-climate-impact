import ParentSize from '@visx/responsive/lib/components/ParentSize';

// components
import Chart from './chart';

export const Component: React.FC = () => (
  <ParentSize>
    {({ width }) => (
      <div className="relative pt-8">
        <div className="absolute top-0 font-serif text-2xl text-white left-16">
          Producción de cultivos
        </div>
        <Chart width={width} height={300} />
        <div className="text-center text-white uppercase opacity-50">
          Fuente:{' '}
          <a href="https://kagi.com" className="underline" target="_blank" rel="noreferrer">
            Link
          </a>
        </div>
      </div>
    )}
  </ParentSize>
);

export default Component;

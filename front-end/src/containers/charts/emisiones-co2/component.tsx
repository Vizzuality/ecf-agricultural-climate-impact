import ParentSize from '@visx/responsive/lib/components/ParentSize';

// components
import Chart from './chart';

export const Component: React.FC = () => (
  <ParentSize>
    {({ width }) => (
      <div className="relative">
        <div className="absolute font-serif text-4xl text-white top-8 left-32 opacity-30">
          Emisiones de CO2
        </div>
        <Chart width={width} height={300} />
        <div className="text-center text-white uppercase opacity-50">
          Fuente:{' '}
          <a
            href="https://www.climatewatchdata.org/ghg-emissions?end_year=2018&regions=ESP&source=PIK&start_year=1900"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            Climate Watch
          </a>
        </div>
      </div>
    )}
  </ParentSize>
);

export default Component;

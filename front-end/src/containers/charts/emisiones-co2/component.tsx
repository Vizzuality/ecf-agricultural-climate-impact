import ParentSize from '@visx/responsive/lib/components/ParentSize';
import cx from 'classnames';

// components
import Chart from './chart';

export const Component: React.FC<{ mobile?: boolean }> = ({ mobile = false }) => (
  <ParentSize>
    {({ width }) => (
      <div className="relative">
        <div
          className={cx({
            'absolute font-serif text-white opacity-30': true,
            'text-xl left-1/2 transform -translate-x-1/2 w-full text-center': mobile,
            'text-4xl top-8 left-32': !mobile,
          })}
        >
          Emisiones de CO2
        </div>
        <Chart width={width} height={mobile ? 240 : 300} mobile={mobile} />
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

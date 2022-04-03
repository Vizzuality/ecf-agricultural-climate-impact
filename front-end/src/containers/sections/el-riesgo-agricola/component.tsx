import { FC } from 'react';
// import { motion } from 'framer-motion';

// utils
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// constants
// import { TITLE } from './constants';

// import ChartEmisionesCo2 from 'containers/charts/emisiones-co2';
import ElRiesgoAgricolaMap from './map';

export const ElRiesgoAgricola: FC = () => {
  return (
    <section className="relative">
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <div className="w-full bg-primary-red">
            <div className="flex w-full pt-16">
              <ElRiesgoAgricolaMap />
            </div>
          </div>
        </Desktop>
        <Mobile>
          <div>Mobile</div>
        </Mobile>
      </MediaContextProvider>
    </section>
  );
};

export default ElRiesgoAgricola;

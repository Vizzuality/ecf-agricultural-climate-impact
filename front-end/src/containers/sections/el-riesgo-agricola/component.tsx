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
            <div className="flex flex-col items-start w-full max-w-screen-lg pt-32 mx-auto bg-primary-red">
              <h1 className="relative px-3 py-2 font-serif text-6xl transition-opacity duration-500 text-primary-red">
                <span className="relative z-10">lo jiesjo ajrikola</span>
              </h1>
              <div className="py-16 text-white" style={{ columns: '2' }}>
                <p>blabla</p>
                <p>blabla</p>
              </div>
            </div>
            <div className="flex flex-col items-start w-full max-w-screen-xl pb-32 mx-auto">
              <div className="w-full">aki sharts</div>
            </div>
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

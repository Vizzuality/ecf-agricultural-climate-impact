import { FC, useState } from 'react';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
// import cx from 'classnames';

// utils
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// constants
import { TITLE } from './constants';

import Chart1 from 'containers/charts/chart1';

export const ElRiesgoClimatico: FC = (props) => {
  return (
    <section className="relative">
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <div className="w-full py-32 bg-primary-red">
            <div className="flex flex-col items-start w-screen max-w-screen-lg mx-auto bg-primary-red">
              <h1 className="relative px-3 py-2 font-serif text-6xl transition-opacity duration-500 text-primary-red">
                <span className="relative z-10">{TITLE}</span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  // viewport={{ one: true }}
                  // animate={{ width: '100%' }}
                  transition={{ duration: 1 }}
                  className="absolute top-0 left-0 z-0 h-full bg-white"
                />
              </h1>
              <div className="py-16 text-white" style={{ columns: '2' }}>
                <p>
                  El aumento de las emisiones de gases de efecto invernadero a nivel global está
                  provocando cambios en los patrones de temperatura, precipitaciones, y la
                  frecuencia frecuencia e intensidad de fenómenos extremos.
                </p>
                <p>
                  También desde España,{' '}
                  <strong>las emisiones de estos gases se multiplicaron por #</strong> desde
                  principios del siglo XX, causadas por el sector energético, industrial,
                  transporte, y agrícola.
                </p>
              </div>
              <div className="w-full">
                <Chart1 />
              </div>
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

export default ElRiesgoClimatico;

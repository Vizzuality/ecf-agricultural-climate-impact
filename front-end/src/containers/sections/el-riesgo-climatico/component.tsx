import { FC } from 'react';
import { motion } from 'framer-motion';

// utils
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// constants
import { TITLE } from './constants';

import ChartEmisionesCo2 from 'containers/charts/emisiones-co2';
import ElRiesgoClimaticoMap from './map';

export const ElRiesgoClimatico: FC = () => {
  return (
    <section className="relative">
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <div className="w-full bg-primary-red">
            <div className="flex flex-col items-start w-full max-w-screen-lg pt-32 mx-auto bg-primary-red">
              <h1 className="relative px-3 py-2 font-serif text-6xl transition-opacity duration-500 text-primary-red">
                <span className="relative z-10">{TITLE}</span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
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
            </div>
            <div className="flex flex-col items-start w-full max-w-screen-xl pb-32 mx-auto">
              <div className="w-full">
                <ChartEmisionesCo2 />
              </div>
            </div>
            <div className="flex w-full pt-16">
              <ElRiesgoClimaticoMap />
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

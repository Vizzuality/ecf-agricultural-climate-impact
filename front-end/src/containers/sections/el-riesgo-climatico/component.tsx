import { FC } from 'react';
import { motion } from 'framer-motion';

// utils
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// constants
import { TITLE } from './constants';

import ChartEmisionesCo2 from 'containers/charts/emisiones-co2';
import ChartCambiosTempperatura from 'containers/charts/cambios-temperatura';
import ChartProduccionesCultivos from 'containers/charts/producciones-cultivos';
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
            <div className="flex flex-col items-start w-full max-w-screen-xl pb-8 mx-auto">
              <div className="w-full">
                <ChartEmisionesCo2 />
              </div>
            </div>
            <div className="flex flex-col items-start w-full max-w-screen-lg mx-auto bg-primary-red">
              <div className="py-4 text-white" style={{ paddingLeft: '50%' }}>
                Décadas de emisiones de gases de efecto invernadero han hecho que los efectos del
                cambio climático sean ya visibles. De hecho, se prevé que la temperatura media
                global aumente entre 2 y 2,5ºC para mediados de siglo, y frenar este proceso
                evitaría mayores impactos.
              </div>
            </div>
            <div className="flex flex-col items-start w-full max-w-screen-xl pb-32 mx-auto">
              <div className="w-full">
                <ChartCambiosTempperatura />
              </div>
              {/* <div className="w-full">
                <ChartProduccionesCultivos />
              </div> */}
            </div>
          </div>
          <div className="w-full bg-white">
            <div className="flex flex-col items-start w-full max-w-screen-xl pt-16 mx-auto">
              <div className="py-4" style={{ paddingLeft: '50%' }}>
                Los impactos del aumento de la temperatura serían visibles no solo en la agricultura
                sino también sobre la población, biodiversidad, océanos, y ecosistemas terrestres a
                nivel global.
              </div>
              <div className="font-serif text-black opacity-5" style={{ fontSize: '260px' }}>
                1,5 a 2ºC
              </div>
              <div className="relative font-serif leading-snug text-7xl -top-40">
                Medio grado de calentamiento podría provocar
              </div>
              <div className="flex">
                <div className="flex-1">
                  <div className="pb-2 font-serif text-5xl font-bold text-primary-red">
                    2 veces más
                  </div>
                  <div>
                    de la población global en
                    <br />
                    riesgo de olas de calor
                  </div>
                </div>
                <div className="flex-1">
                  <div className="pb-2 font-serif text-5xl font-bold text-primary-red">
                    400 milliones
                  </div>
                  <div>de población global en riesgo hídrico</div>
                </div>
                <div className="flex-1">
                  <div className="pb-2 font-serif text-5xl font-bold text-primary-red">
                    pérdidas del 7%
                  </div>
                  <div>rendimiento de cultivos como el maíz</div>
                </div>
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

import { FC } from 'react';
import { motion } from 'framer-motion';

// utils
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// constants
import { TITLE } from './constants';

import ChartEmisionesCo2 from 'containers/charts/emisiones-co2';
import ChartCambiosTempperatura from 'containers/charts/cambios-temperatura';
import ElRiesgoClimaticoMap from './map';

export const ElRiesgoClimatico: FC = () => {
  return (
    <section className="relative">
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <div className="w-full bg-primary-red" id="section-el-riesgo-climatico">
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
              <div className="py-16 text-lg text-white" style={{ columns: '2' }}>
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
              <div className="pt-8 pb-16 text-white" style={{ paddingLeft: '50%' }}>
                Décadas de emisiones de gases de efecto invernadero han hecho que los efectos del
                cambio climático sean ya visibles. De hecho, se prevé que la temperatura media
                global aumente entre 1,5 y 2ºC para mediados de siglo, de acuerdo con los dos
                escenarios climáticos futuros, trayectoria de concentración representativa (RCP, por
                sus siglas en inglés) 4.5 y RCP 8.5, respectivamente.
              </div>
            </div>
            <div className="flex flex-col items-start w-full max-w-screen-xl pb-32 mx-auto">
              <div className="w-full">
                <ChartCambiosTempperatura />
              </div>
            </div>
          </div>
          <div className="w-full bg-white">
            <div className="flex flex-col items-start w-full h-screen max-w-screen-xl pt-16 mx-auto text-lg">
              <div className="py-4" style={{ marginLeft: '60%', width: '30%' }}>
                Los impactos del aumento de la temperatura serían visibles no solo en la agricultura
                sino también sobre la población, biodiversidad, océanos, y ecosistemas terrestres a
                nivel global.
              </div>
              <div
                className="font-serif text-black opacity-5"
                style={{ fontSize: '260px', lineHeight: '260px' }}
              >
                1,5 a 2ºC
              </div>
              <div className="relative mb-16 -mt-40 font-serif leading-snug text-7xl">
                Medio grado de calentamiento podría provocar
              </div>
              <div className="flex w-full">
                <div className="flex-1">
                  <div className="pb-2 font-serif text-5xl font-bold text-primary-red">
                    2 veces más
                  </div>
                  <div>de la población global en riesgo de olas de calor</div>
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
          <div className="w-full text-2xl text-center text-white bg-primary-red">
            <div className="w-7/12 py-24 mx-auto">
              De aquí que tomar medidas de prevención sea una prioridad para asegurar la calidad y
              cantidad de la producción agrícola. Al mismo tiempo, la implementación de medidas de
              prevención hará que se reduzca la necesidad de medidas de adaptación a largo plazo,
              que requieran más recursos económicos y sean menos efectivas.
            </div>
          </div>
        </Desktop>
        <Mobile>
          <div className="w-full bg-primary-red" id="section-el-riesgo-climatico">
            <div className="flex flex-col items-start w-full max-w-screen-lg px-2 pt-32 mx-auto bg-primary-red">
              <h1 className="relative px-2 py-1 font-serif text-3xl transition-opacity duration-500 text-primary-red">
                <span className="relative z-10">{TITLE}</span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1 }}
                  className="absolute top-0 left-0 z-0 h-full bg-white"
                />
              </h1>
              <div className="py-16 text-lg text-white">
                <p className="pb-4">
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
                <ChartEmisionesCo2 mobile={true} />
              </div>
            </div>
            <div className="flex flex-col items-start w-full max-w-screen-lg mx-auto bg-primary-red">
              <div className="px-4 pt-8 pb-16 text-lg text-white">
                Décadas de emisiones de gases de efecto invernadero han hecho que los efectos del
                cambio climático sean ya visibles. De hecho, se prevé que la temperatura media
                global aumente entre 1,5 y 2ºC para mediados de siglo, de acuerdo con los dos
                escenarios climáticos futuros, trayectoria de concentración representativa (RCP, por
                sus siglas en inglés) 4.5 y RCP 8.5, respectivamente.
              </div>
            </div>
            <div className="flex flex-col items-start w-full max-w-screen-xl pb-32 mx-auto">
              <div className="w-full">
                <ChartCambiosTempperatura mobile={true} />
              </div>
            </div>
          </div>
          <div className="w-full bg-white">
            <div className="flex flex-col items-start w-full max-w-screen-xl pt-8 mx-auto text-lg">
              <div className="px-2 py-4">
                Los impactos del aumento de la temperatura serían visibles no solo en la agricultura
                sino también sobre la población, biodiversidad, océanos, y ecosistemas terrestres a
                nivel global.
              </div>
              <div
                className="px-2 font-serif text-3xl text-black opacity-5"
                style={{ fontSize: '23vw', lineHeight: '40vw' }}
              >
                1,5 a 2ºC
              </div>
              <div className="relative pl-4 pr-8 mb-16 -mt-12 font-serif text-3xl leading-snug text-right">
                Medio grado de calentamiento podría provocar
              </div>
              <div className="flex flex-col w-full px-4">
                <div className="flex-1 mb-8">
                  <div className="pb-2 font-serif text-2xl font-bold text-primary-red">
                    2 veces más
                  </div>
                  <div>de la población global en riesgo de olas de calor</div>
                </div>
                <div className="flex-1 mb-8">
                  <div className="pb-2 font-serif text-2xl font-bold text-primary-red">
                    400 milliones
                  </div>
                  <div>de población global en riesgo hídrico</div>
                </div>
                <div className="flex-1">
                  <div className="pb-2 font-serif text-2xl font-bold text-primary-red">
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
          <div className="w-full text-xl text-center text-white bg-primary-red">
            <div className="py-16 mx-4">
              De aquí que tomar medidas de prevención sea una prioridad para asegurar la calidad y
              cantidad de la producción agrícola. Al mismo tiempo, la implementación de medidas de
              prevención hará que se reduzca la necesidad de medidas de adaptación a largo plazo,
              que requieran más recursos económicos y sean menos efectivas.
            </div>
          </div>
        </Mobile>
      </MediaContextProvider>
    </section>
  );
};

export default ElRiesgoClimatico;

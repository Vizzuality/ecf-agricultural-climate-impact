import { FC } from 'react';
import { motion } from 'framer-motion';

// utils
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// constants
// import { TITLE } from './constants';

import ChartProduccionesCultivos from 'containers/charts/producciones-cultivos';
import ElRiesgoAgricolaMap from './map';

export const ElRiesgoAgricola: FC = () => {
  return (
    <section className="relative">
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <div
            className="flex flex-col items-start w-full bg-primary-black"
            id="section-el-riesgo-agricola"
          >
            <div className="flex flex-col items-start w-full max-w-screen-lg pt-32 mx-auto">
              <h1 className="relative px-3 py-2 font-serif text-6xl transition-opacity duration-500 text-primary-black">
                <span className="relative z-10">El riesgo agrícola</span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1 }}
                  className="absolute top-0 left-0 z-0 h-full bg-white"
                />
              </h1>
              <div className="py-16 text-lg text-white" style={{ columns: '2' }}>
                <p>
                  La dieta mediterránea es más que una fuente de salud para la población española;
                  también es gastronomía y cultura que exportamos a países alrededor del mundo. No
                  es casual que el aceite de oliva, el trigo, y el vino –los tres alimentos clave de
                  la dieta del siglo de oro en España– sean hoy principales productos de exportación
                  de la agricultura española.
                </p>
                <p>
                  Estos importantes datos de exportación (al igual que el consumo a nivel nacional)
                  se deben en gran parte al reconocimiento de la calidad de nuestros productos, no
                  solo como alimentos saludables, si no también por sus cualidades para generar
                  experiencias de consumo óptimas.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start w-full max-w-screen-xl pb-8 mx-auto">
              <div className="w-full">
                <ChartProduccionesCultivos />
              </div>
            </div>
            <div className="flex justify-end w-full max-w-screen-lg mx-auto mt-8 mb-16">
              <div className="w-1/2 text-lg text-white">
                A raíz de las consecuencias del cambio climático, la producción agrícola podría
                estar en riesgo, y consecuentemente afectar al valor nutricional, la experiencia de
                consumo, y la recepción de los productos tanto a nivel nacional como internacional.
                Sin embargo, las consecuencias del cambio climático dependen tanto del tipo de
                cultivo y variedad, como de la zona geográfica.
              </div>
            </div>
          </div>
          <div className="w-full bg-primary-black">
            <div className="flex w-full">
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

import { FC, useState } from 'react';

import cx from 'classnames';

import Button from 'components/button';

// utils
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

export const CultivoCulturaResiliencia: FC = () => {
  return (
    <section>
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <div className="relative w-full bg-primary-red" id="section-cultivo-cultura-resiliencia">
            <div className="sticky top-0">
              <div className="w-full max-w-screen-lg py-24 mx-auto text-lg">
                <div className="flex gap-3">
                  <div className="flex-initial px-2 py-2 font-serif text-6xl bg-white">Cultivo</div>
                  <div className="flex-initial px-2 py-2 font-serif text-6xl bg-white">Cultura</div>
                  <div className="flex-initial px-2 py-2 font-serif text-6xl bg-white">
                    Resiliencia
                  </div>
                </div>
                <div className="py-16 text-white" style={{ columns: '2' }}>
                  <p className="mb-4">
                    A pesar de que predecir la magnitud de los impactos del cambio climático en la
                    agricultura es complejo, no hay dudas en cuanto a que afectará al paisaje
                    agrícola español. La diversidad geográfica de nuestro país y la capacidad de
                    mitigar las causas a través de reducción de las emisiones, así como la
                    innovación para capturar carbono atmosférico, son factores que influirán sobre
                    cuan precisas son las actuales proyecciones.
                  </p>
                  <p className="my-4">
                    Como muestra el conocimiento del que disponemos, las grandes extensiones que
                    ocupan los olivares andaluces se podrían ver mermadas, los campos de cereales
                    castellanoleoneses podrían ver su producción reducida. Los viñedos manchegos se
                    podrían desplazar en dirección norte hacia zonas menos afectadas por olas de
                    calor, y las dehesas extremeñas se verán afectadas por la aridificación.
                  </p>
                  <p className="my-4">
                    El aumento de las temperaturas conllevará cambios en los patrones de
                    precipitación, frecuencia y magnitud de fenómenos extremos. Como consecuencia,
                    la cantidad y calidad de la producción agrícola se podrían ver afectadas
                    provocando riesgos en nuestra salud, economía, y cultura.
                  </p>
                  <p className="my-4">
                    Aunque algunos de estos efectos ya sean visibles, entender las consecuencias de
                    los riesgos climáticos es la base para desarrollar estrategias de prevención del
                    cambio climático y protección del mundo agrícola, a base de financiación y
                    políticas regionales, nacionales y comunitarias.
                  </p>
                  <p className="my-4">
                    Tomar acción hoy con el objetivo de mantener el calentamiento por debajo de los
                    1.5ºC, es mas eficiente y menos costoso; también evitará otras consecuencias a
                    nivel global. La prevención del cambio climático, por tanto, no solo nos ayudará
                    a proteger la agricultura y la economía, sino que también hará que un eterno
                    verano no seque nuestra gastronomía, tradiciones, cultura e identidad.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button theme="secondary-alt" size="l">
                    Descargar el estudio
                  </Button>
                </div>
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

export default CultivoCulturaResiliencia;

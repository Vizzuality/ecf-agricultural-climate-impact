import { FC, useState } from 'react';

import MapSlider from 'components/map-slider';

import MapRisk from 'containers/map-risk';

import type { ElRiesgoClimaticoMapTypes } from './types';

import { YEARS_SEQUIAS_DEHESA, SCENARIOS_SEQUIAS_DEHESA } from './constants';

export const MapSequiasDehesaMap: FC<ElRiesgoClimaticoMapTypes> = ({
  defaultActiveLayerId = 'sequias-dehesa',
  allowZoom = false,
}) => {
  const yearsProyeccionesSequiasDehesa = YEARS_SEQUIAS_DEHESA.map((y) => {
    const splitValues = y.value.split(' - ');
    const label = Math.floor(
      parseInt(splitValues[0]) + (parseInt(splitValues[1]) - parseInt(splitValues[0])) / 2,
    );

    y.label = '' + label;

    return y;
  });

  const [year, setYear] = useState(yearsProyeccionesSequiasDehesa[0]);
  const [scenario, setScenario] = useState(SCENARIOS_SEQUIAS_DEHESA[0]);
  const [sliderValue, setSliderValue] = useState(0);

  const handleYearSliderChange = (e) => {
    const currentYear = yearsProyeccionesSequiasDehesa[e];
    setYear(currentYear);
    setSliderValue(yearsProyeccionesSequiasDehesa.indexOf(currentYear));
  };

  const handleScenarioSliderChange = (e) => {
    setScenario(SCENARIOS_SEQUIAS_DEHESA[e]);
    // const currentYear = yearsProyeccionesSequiasDehesa[0];
    // setSliderValue(yearsProyeccionesSequiasDehesa.indexOf(currentYear));
  };

  return (
    <div className="relative w-full overflow-hidden bg-lightest-grey">
      <div className="sticky top-0 left-0 z-20 w-full h-screen">
        <div className="w-2/5 ">
          <div className="relative ml-16 text-lg font-bold text-gray-400 top-32">En el mapa:</div>
          <div className="absolute bottom-0 z-20 w-2/5 p-16">
            <div className="inline-block w-1/2 pr-2">
              <MapSlider
                values={SCENARIOS_SEQUIAS_DEHESA}
                value={scenario}
                onChange={handleScenarioSliderChange}
              />
            </div>
            <div className="inline-block w-1/2 pl-2">
              <MapSlider
                values={yearsProyeccionesSequiasDehesa}
                value={year}
                currentValue={sliderValue}
                onChange={handleYearSliderChange}
              />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-3/5 h-screen mapa-sequias">
          <MapRisk
            activeLayerId={defaultActiveLayerId}
            allowZoom={allowZoom}
            scenario={scenario}
            year={year}
            bounds="spain"
            legend="sequias-dehesa"
          />
        </div>
      </div>
      <div className="relative w-2/5 h-screen p-16 pt-40" style={{ marginTop: '-100vh' }}>
        <div className="top-0 h-screen">
          <div className="font-serif text-2xl">
            Duraci??n de las sequ??as a lo largo del a??o en zonas de dehesa.
          </div>
          <div className="mt-12">
            Extremadura concentra gran parte de la dehesa espa??ola, con 1.2 mHa que van a estar
            expuestas (como otros ecosistemas mediterr??neos) al calentamiento y las sequ??as que
            ser??n consecuencia del cambio clim??tico. El aumento de la temperatura o la reducci??n de
            las precipitaciones podr??a derivar por una parte en una menor producci??n vegetal, y por
            otra parte en el agostamiento de la vegetaci??n herb??cea. Como consecuencia, esto podr??a
            reducir la capacidad de carga animal por unidad de superficie y un posible d??ficit en la
            calidad de la dieta animal ??? menor digestibilidad, menor contenido en prote??nas.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSequiasDehesaMap;

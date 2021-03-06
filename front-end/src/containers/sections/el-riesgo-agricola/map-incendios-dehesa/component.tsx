import { FC, useState } from 'react';

import MapSlider from 'components/map-slider';

import MapRisk from 'containers/map-risk';

import type { ElRiesgoClimaticoMapTypes } from './types';

import { YEARS_INCENDIOS_DEHESA, SCENARIOS_INCENDIOS_DEHESA } from './constants';

export const MapIncendiosDehesaMap: FC<ElRiesgoClimaticoMapTypes> = ({
  defaultActiveLayerId = 'incendios-dehesa',
  allowZoom = false,
}) => {
  const yearsIncendiosDehesa = YEARS_INCENDIOS_DEHESA.map((y) => {
    const splitValues = y.value.split('-');
    const label = Math.floor(
      parseInt(splitValues[0]) + (parseInt(splitValues[1]) - parseInt(splitValues[0])) / 2,
    );

    y.label = '' + label;

    return y;
  });

  const [year, setYear] = useState(yearsIncendiosDehesa[0]);
  const [scenario, setScenario] = useState(SCENARIOS_INCENDIOS_DEHESA[0]);
  const [sliderValue, setSliderValue] = useState(0);

  const handleYearSliderChange = (e) => {
    const currentYear = yearsIncendiosDehesa[e];
    setYear(currentYear);
    setSliderValue(yearsIncendiosDehesa.indexOf(currentYear));
  };

  const handleScenarioSliderChange = (e) => {
    setScenario(SCENARIOS_INCENDIOS_DEHESA[e]);
  };

  return (
    <div className="relative w-full overflow-hidden bg-lightest-grey">
      <div className="sticky top-0 left-0 z-20 w-full h-screen">
        <div className="w-2/5 ">
          <div className="relative ml-16 text-lg font-bold text-gray-400 top-32">En el mapa:</div>
          <div className="absolute bottom-0 z-20 w-2/5 p-16">
            <div className="inline-block w-1/2 pr-2">
              <MapSlider
                values={SCENARIOS_INCENDIOS_DEHESA}
                value={scenario}
                onChange={handleScenarioSliderChange}
              />
            </div>
            <div className="inline-block w-1/2 pl-2">
              <MapSlider
                values={yearsIncendiosDehesa}
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
            legend="incendios-dehesa"
          />
        </div>
      </div>
      <div className="relative w-2/5 h-screen p-16 pt-40" style={{ marginTop: '-100vh' }}>
        <div className="top-0 h-screen">
          <div className="font-serif text-2xl">Riesgo de incendios en zonas de dehesa</div>
          <div className="mt-12">
            <p>
              La p??rdida de biodiversidad vegetal causada por la aridez se podr??a ver empeorada por
              un mayor riesgo de incendios, que favorecer??a el crecimiento de especies pir??fitas y
              menos nutritivas para el ganado y especies de inter??s cineg??tico.
            </p>
            <p>
              Aunque el volumen de producci??n en dehesas no es comparable al de zonas de agricultura
              intensiva, la calidad de los productos y el impacto econ??mico sobre la poblaci??n local
              son significativos y reconocidos. Prevenir las consecuencias del cambio clim??tico no
              solo proteger?? la explotaci??n sostenible de las dehesas y sus beneficios sociales,
              sino tambi??n el ecosistema natural.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapIncendiosDehesaMap;

import { FC, useState } from 'react';

import Button from 'components/button';
import MapSlider from 'components/map-slider';

import MapRisk from 'containers/map-risk';

import type { ElRiesgoClimaticoMapTypes } from './types';

import { YEARS_PRECIPITACION, SCENARIOS } from './constants';

export const MapPrecipitacionMap: FC<ElRiesgoClimaticoMapTypes> = ({
  defaultActiveLayerId = 'precipitacion',
  allowZoom = false,
}) => {
  const yearsPrecipitacion = YEARS_PRECIPITACION.map((y) => {
    const splitValues = y.value.split(' - ');
    const label = Math.floor(
      parseInt(splitValues[0]) + (parseInt(splitValues[1]) - parseInt(splitValues[0])) / 2,
    );

    y.label = '' + label;

    return y;
  });

  const [geoType, setGeoType] = useState('municipios');
  const [year, setYear] = useState(yearsPrecipitacion[0]);
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [sliderValue, setSliderValue] = useState(0);

  const handleYearSliderChange = (e) => {
    const currentYear = yearsPrecipitacion[e];
    setYear(currentYear);
    setSliderValue(yearsPrecipitacion.indexOf(currentYear));
  };

  const handleGeoTypeChange = (type) => {
    setGeoType(type);
  };

  const handleScenarioSliderChange = (e) => {
    setScenario(SCENARIOS[e]);
  };

  return (
    <div className="relative w-full overflow-hidden bg-lightest-grey">
      <div className="sticky top-0 left-0 z-20 w-full h-screen">
        <div className="w-2/5 ">
          <div className="relative ml-16 text-lg font-bold text-gray-400 top-32">En el mapa: </div>
          <div className="flex justify-center">
            <Button
              theme="primary"
              size="base"
              className="flex-shrink-0 sm:mr-5"
              onClick={() => handleGeoTypeChange('municipios')}
            >
              municipios
            </Button>
            <Button
              theme="primary"
              size="base"
              className="flex-shrink-0 sm:mr-5"
              onClick={() => handleGeoTypeChange('provincias')}
            >
              provincias
            </Button>
            <Button
              theme="primary"
              size="base"
              className="flex-shrink-0 sm:mr-5"
              onClick={() => handleGeoTypeChange('comunidades_autonomas')}
            >
              comunidades
            </Button>
          </div>
          <div className="absolute bottom-0 z-20 w-2/5 p-16">
            <div className="inline-block w-1/2 pr-2">
              <MapSlider
                values={SCENARIOS}
                value={scenario}
                onChange={handleScenarioSliderChange}
              />
            </div>
            <div className="inline-block w-1/2 pl-2">
              <MapSlider
                values={yearsPrecipitacion}
                value={year}
                currentValue={sliderValue}
                onChange={handleYearSliderChange}
              />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-3/5 h-screen">
          <MapRisk
            activeLayerId={defaultActiveLayerId}
            allowZoom={allowZoom}
            geoType={geoType}
            scenario={scenario}
            year={year}
            bounds="spain"
            legend="precipitacion"
          />
        </div>
      </div>
      <div className="relative w-2/5 h-screen p-16 pt-40" style={{ marginTop: '-100vh' }}>
        <div className="top-0 h-screen">
          <div className="font-serif text-2xl">Precipitación</div>
          {/* <div className="mt-12">
            <p>
              La pérdida de biodiversidad vegetal causada por la aridez se podría ver empeorada por
              un mayor riesgo de incendios, que favorecería el crecimiento de especies pirófitas y
              menos nutritivas para el ganado y especies de interés cinegético.
            </p>
            <p>
              Aunque el volumen de producción en dehesas no es comparable al de zonas de agricultura
              intensiva, la calidad de los productos y el impacto económico sobre la población local
              son significativos y reconocidos. Prevenir las consecuencias del cambio climático no
              solo protegerá la explotación sostenible de las dehesas y sus beneficios sociales,
              sino también el ecosistema natural.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MapPrecipitacionMap;

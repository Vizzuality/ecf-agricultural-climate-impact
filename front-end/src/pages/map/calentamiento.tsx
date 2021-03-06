import { FC, useState, useEffect } from 'react';
import MapVisualization from 'containers/map-visualization';
import Button from 'components/button';
import MapSlider from 'components/map-slider';

import type { ElRiesgoClimaticoMapTypes } from 'containers/sections/el-riesgo-climatico/types';

import {
  SCENARIOS,
  YEARS_CALENTAMIENTO,
  YEARS_SEQUIAS,
} from 'containers/sections/el-riesgo-climatico/constants';

export const ElRiesgoClimaticoMapCalentamiento: FC<ElRiesgoClimaticoMapTypes> = ({
  defaultActiveLayerId = 'calentamiento',
  showAreaButtons = false,
  allowZoom = true,
}) => {
  const yearsCalentamiento = YEARS_CALENTAMIENTO.map((y) => {
    const splitValues = y.value.split(' - ');
    const label = Math.floor(
      parseInt(splitValues[0]) + (parseInt(splitValues[1]) - parseInt(splitValues[0])) / 2,
    );

    y.label = '' + label;

    return y;
  });

  const yearsSequias = YEARS_SEQUIAS.map((y) => {
    const splitValues = y.value.split(' - ');
    const label = Math.floor(
      parseInt(splitValues[0]) + (parseInt(splitValues[1]) - parseInt(splitValues[0])) / 2,
    );

    y.label = '' + label;

    return y;
  });

  const [activeLayerId] = useState(defaultActiveLayerId);
  const [geoType, setGeoType] = useState('municipios');
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [year, setYear] = useState(yearsCalentamiento[0]);
  const [sliderValue, setSliderValue] = useState(0);

  // const handleDatasetChange = (dataset) => {
  //   setActiveLayerId(dataset);
  // };

  const handleGeoTypeChange = (type) => {
    setGeoType(type);
  };

  const handleScenarioSliderChange = (e) => {
    setScenario(SCENARIOS[e]);
  };

  const handleYearSliderChange = (e) => {
    const currentYear = activeLayerId === 'calentamiento' ? yearsCalentamiento[e] : yearsSequias[e];
    setYear(currentYear);
    setSliderValue(
      activeLayerId === 'calentamiento'
        ? yearsCalentamiento.indexOf(currentYear)
        : yearsSequias.indexOf(currentYear),
    );
  };

  useEffect(() => {
    setSliderValue(0);
    setYear(activeLayerId === 'calentamiento' ? yearsCalentamiento[0] : yearsSequias[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLayerId]);

  return (
    <div className="relative w-full overflow-hidden bg-lightest-grey">
      <div className="sticky top-0 left-0 z-20 w-full h-screen">
        <div className="w-2/5 ">
          <div className="relative ml-16 text-lg font-bold text-gray-400 top-32">En el mapa:</div>
          {/* {showAreaButtons && ( */}
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
          {/* )} */}
        </div>
        <div className="absolute bottom-0 z-20 w-2/5 p-16">
          <div className="inline-block w-1/2 pr-2">
            <MapSlider values={SCENARIOS} value={scenario} onChange={handleScenarioSliderChange} />
          </div>
          <div className="inline-block w-1/2 pl-2">
            <MapSlider
              values={activeLayerId === 'calentamiento' ? yearsCalentamiento : yearsSequias}
              value={year}
              currentValue={sliderValue}
              onChange={handleYearSliderChange}
            />
          </div>
        </div>
        <div className="absolute top-0 right-0 z-20 w-3/5 h-screen mapa-calentamiento">
          <MapVisualization
            activeLayerId={activeLayerId}
            geoType={geoType}
            scenario={scenario}
            year={year}
            allowZoom={allowZoom}
          />
        </div>
      </div>
      <div className="absolute top-0 w-2/5 p-16 pt-40">
        <div className="top-0 h-screen">
          <div className="font-serif text-2xl">Proyecciones de calentamiento en Espa??a</div>
          <div className="mt-12">
            Asociado al calentamiento, la Pen??nsula Ib??rica se ver?? afectada por la{' '}
            <strong>aridificaci??n</strong>, que har?? que el aumento de las temperaturas venga
            asociado a sequ??as m??s intensas y duraderas con consecuencias asociadas a la mayor
            incidencia de incendios forestales y erosi??n del suelo.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElRiesgoClimaticoMapCalentamiento;

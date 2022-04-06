import { useEffect, useState, FC } from 'react';
import { Scrollama, Step } from 'react-scrollama';
// import { Controller, Scene } from 'react-scrollmagic';

import Button from 'components/button';
import MapSlider from 'components/map-slider';

import MapVisualization from 'containers/map-visualization';

// constants
import { SCENARIOS, YEARS_CALENTAMIENTO, YEARS_SEQUIAS, MAP_SECTION_HEIGHT } from './constants';

import type { ElRiesgoClimaticoMapTypes } from './types';

export const ElRiesgoClimaticoMap: FC<ElRiesgoClimaticoMapTypes> = ({
  defaultActiveLayerId = 'calentamiento',
  showAreaButtons = false,
  allowZoom = false,
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

  const [activeLayerId, setActiveLayerId] = useState(defaultActiveLayerId);
  const [geoType, setGeoType] = useState('municipios');
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [year, setYear] = useState(yearsCalentamiento[0]);
  const [sliderValue, setSliderValue] = useState(0);

  const handleActiveLayerChange = (dataset) => {
    setActiveLayerId(dataset);
  };

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

  const onStepEnter = (e) => {
    handleActiveLayerChange(e.data.layerId);
  };

  useEffect(() => {
    setSliderValue(0);
    setYear(activeLayerId === 'calentamiento' ? yearsCalentamiento[0] : yearsSequias[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLayerId]);

  return (
    <div className="relative w-full bg-lightest-grey">
      <div className="sticky top-0 left-0 z-20 w-full h-screen">
        <div className="w-2/5 ">
          <div className="relative ml-16 text-lg font-bold text-gray-400 top-32">En el mapa:</div>
          {showAreaButtons && (
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
          )}
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
      <Scrollama onStepEnter={onStepEnter} offset={0.5}>
        <Step data={{ layerId: 'calentamiento' }}>
          <div className="relative w-2/5 p-16 pt-40" style={{ marginTop: '-100vh' }}>
            <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
              <div className="sticky top-40">
                <div className="font-serif text-2xl">Proyecciones de calentamiento</div>
                <div className="mt-12 text-lg">
                  Asociado al calentamiento, la Península Ibérica se verá afectada por la{' '}
                  <strong>aridificación</strong>, que hará que el aumento de las temperaturas venga
                  asociado a sequías más intensas y duraderas con consecuencias asociadas a la mayor
                  incidencia de incendios forestales y erosión del suelo.
                </div>
              </div>
            </div>
          </div>
        </Step>
        <Step data={{ layerId: 'sequias' }}>
          <div className="w-2/5 p-16 pt-40">
            <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
              <div className="sticky top-40">
                <div className="font-serif text-2xl">Proyecciones de sequías</div>
                <div className="mt-12 text-lg">
                  <p>
                    Se espera un{' '}
                    <strong>aumento en la duración y severidad de las sequías veraniegas</strong>,
                    seguidas por periodos de lluvias más cortos pero intensos durante los meses de
                    Octubre y Noviembre.
                  </p>
                  <p>
                    Estos cambios en los ciclos hídricos afectarán a la agricultura de secano y
                    regadío si se mantienen las condiciones de cultivo actuales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Step>
      </Scrollama>
    </div>
  );
};

export default ElRiesgoClimaticoMap;

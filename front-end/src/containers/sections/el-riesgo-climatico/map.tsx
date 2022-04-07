import { useState, useCallback, FC } from 'react';
import { Scrollama, Step } from 'react-scrollama';

// utils
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

import MapSlider from 'components/map-slider';

import MapRisk from 'containers/map-risk';

const MAP_SECTION_HEIGHT = '200vh';

import { SCENARIOS_CALENTAMIENTO, YEARS_CALENTAMIENTO } from './map-calentamiento/constants';
import { SCENARIOS_SEQUIAS, YEARS_SEQUIAS } from './map-sequias/constants';

const YEARS = {
  calentamiento: YEARS_CALENTAMIENTO,
  sequias: YEARS_SEQUIAS,
};

const SCENARIOS = {
  calentamiento: SCENARIOS_CALENTAMIENTO,
  sequias: SCENARIOS_SEQUIAS,
};

import type { ElRiesgoClimaticoMapTypes } from './types';

export const ElRiesgoClimaticoMap: FC<ElRiesgoClimaticoMapTypes> = ({
  defaultActiveLayerId = 'calentamiento',
}) => {
  const getYears = (layer) => {
    const years = YEARS[layer];

    const theseYears = years?.map((y) => {
      const splitValues =
        y.value.indexOf(' - ') >= 0
          ? y.value.split(' - ')
          : y.value.indexOf('–') >= 0
          ? y.value.split('–')
          : y.value.indexOf('-') >= 0
          ? y.value.split('-')
          : y.value.split('_');
      const label = Math.floor(
        parseInt(splitValues[0]) + (parseInt(splitValues[1]) - parseInt(splitValues[0])) / 2,
      );

      y.label = '' + label;

      return y;
    });

    return theseYears;
  };

  const getScenarios = (layer) => {
    return SCENARIOS[layer];
  };

  const [activeLayerId, setActiveLayerId] = useState(defaultActiveLayerId);
  const [bounds, setBounds] = useState('spain');
  const [geoType] = useState('municipios');
  const [scenario, setScenario] = useState(getScenarios(defaultActiveLayerId)?.[0]);
  const [scenarios, setScenarios] = useState(getScenarios(defaultActiveLayerId));
  const [year, setYear] = useState(getYears(defaultActiveLayerId)?.[0]);
  const [years, setYears] = useState(getYears(defaultActiveLayerId));
  const [yearSliderValue, setYearSliderValue] = useState(0);
  const [scenarioSliderValue, setScenarioSliderValue] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);

  const handleActiveLayerChange = useCallback((data) => {
    setYearSliderValue(0);
    setBounds(data.area);
    setScenarioSliderValue(0);
    setYears(getYears(data.layerId));
    setYear(getYears(data.layerId)?.[0]);
    setScenarios(getScenarios(data.layerId));
    setScenario(getScenarios(data.layerId)?.[0]);

    setScenarios(getScenarios(data.layerId));
    setScenario(getScenarios(data.layerId)?.[0]);

    setActiveLayerId(data.layerId);
  }, []);

  const handleScenarioSliderChange = useCallback(
    (e) => {
      const currentScenario = getScenarios(activeLayerId)[e];
      setScenario(currentScenario);
      setScenarioSliderValue(getScenarios(activeLayerId).indexOf(currentScenario));
    },
    [activeLayerId],
  );

  const handleYearSliderChange = useCallback(
    (e) => {
      const currentYear = getYears(activeLayerId)[e];
      setYear(currentYear);
      setYearSliderValue(getYears(activeLayerId).indexOf(currentYear));
    },
    [activeLayerId],
  );

  const onStepEnter = (e) => {
    handleActiveLayerChange(e.data);
  };

  const onStepProgress = (data) => {
    setCurrentProgress(data.progress);
  };

  return (
    <MediaContextProvider>
      <Desktop includeBiggerScreens>
        <div className="relative w-full bg-lightest-grey">
          <div className="sticky top-0 left-0 z-20 w-full h-screen">
            <div className="w-2/5 ">
              <div className="relative ml-16 text-lg font-bold text-gray-400 top-32">
                En el gmapa:b
              </div>
            </div>
            <div className="absolute bottom-0 z-20 w-2/5 p-16">
              <div className="inline-block w-1/2 pr-2">
                {scenarios && scenario && (
                  <>
                    <div className="pb-2 text-sm text-gray-400">Escenario de calentamiento</div>
                    <MapSlider
                      values={scenarios}
                      value={scenario}
                      currentValue={scenarioSliderValue}
                      onChange={handleScenarioSliderChange}
                      disabled={scenarios.length === 1 || scenario.value === 'baseline'}
                    />
                  </>
                )}
              </div>
              <div className="inline-block w-1/2 pl-2">
                {years && year && (
                  <>
                    <div className="pb-2 text-sm text-gray-400">Año</div>
                    <MapSlider
                      values={years}
                      value={year}
                      currentValue={yearSliderValue}
                      onChange={handleYearSliderChange}
                      disabled={years.length === 1}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="absolute top-0 right-0 z-20 w-3/5 h-screen mapa-calentamiento">
              <MapRisk
                activeLayerId={activeLayerId}
                geoType={geoType}
                scenario={scenario}
                year={year}
                allowZoom
                bounds={bounds}
                legend={activeLayerId}
              />
            </div>
            <div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  top: -(currentProgress * 10),
                  opacity:
                    activeLayerId === 'calentamiento'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-2xl">Proyecciones de calentamiento</div>
                  <div className="mt-12 text-lg">
                    Asociado al calentamiento, la Península Ibérica se verá afectada por la{' '}
                    <strong>aridificación</strong>, que hará que el aumento de las temperaturas
                    venga asociado a sequías más intensas y duraderas con consecuencias asociadas a
                    la mayor incidencia de incendios forestales y erosión del suelo.
                  </div>
                </div>
              </div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  top: -(currentProgress * 10),
                  opacity:
                    activeLayerId === 'sequias'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
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
          </div>

          <Scrollama onStepEnter={onStepEnter} progress onStepProgress={onStepProgress} offset={0}>
            <Step data={{ layerId: 'calentamiento', id: 0 }}>
              <div className="relative w-2/5 p-16 pt-40 opacity-0" style={{ marginTop: '-100vh' }}>
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">Proyecciones de calentamiento</div>
                    <div className="mt-12 text-lg">
                      Asociado al calentamiento, la Península Ibérica se verá afectada por la{' '}
                      <strong>aridificación</strong>, que hará que el aumento de las temperaturas
                      venga asociado a sequías más intensas y duraderas con consecuencias asociadas
                      a la mayor incidencia de incendios forestales y erosión del suelo.
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step data={{ layerId: 'sequias', id: 1 }}>
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">Proyecciones de sequías</div>
                    <div className="mt-12 text-lg">
                      <p>
                        Se espera un{' '}
                        <strong>
                          aumento en la duración y severidad de las sequías veraniegas
                        </strong>
                        , seguidas por periodos de lluvias más cortos pero intensos durante los
                        meses de Octubre y Noviembre.
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
      </Desktop>
      <Mobile>
        <div className="relative w-full bg-lightest-grey">
          <div className="sticky top-0 left-0 z-20 w-full h-screen">
            <div className="">
              <div className="relative ml-16 text-lg font-bold text-gray-400 top-20">
                En el mapa:a
              </div>
            </div>
            <div className="absolute bottom-0 z-20 w-2/5 p-16">
              <div className="inline-block w-1/2 pr-2">
                {scenarios && scenario && (
                  <>
                    <div className="pb-2 text-sm text-gray-400">Escenario de calentamiento</div>
                    <MapSlider
                      values={scenarios}
                      value={scenario}
                      currentValue={scenarioSliderValue}
                      onChange={handleScenarioSliderChange}
                      disabled={scenarios.length === 1 || scenario.value === 'baseline'}
                    />
                  </>
                )}
              </div>
              <div className="inline-block w-1/2 pl-2">
                {years && year && (
                  <>
                    <div className="pb-2 text-sm text-gray-400">Año</div>
                    <MapSlider
                      values={years}
                      value={year}
                      currentValue={yearSliderValue}
                      onChange={handleYearSliderChange}
                      disabled={years.length === 1}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="absolute top-0 right-0 z-20 w-3/5 h-screen mapa-calentamiento">
              <MapRisk
                activeLayerId={activeLayerId}
                geoType={geoType}
                scenario={scenario}
                year={year}
                allowZoom
                bounds={bounds}
                legend={activeLayerId}
                mobile={true}
              />
            </div>
            <div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  top: -(currentProgress * 10),
                  opacity:
                    activeLayerId === 'calentamiento'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-2xl">Proyecciones de calentamiento</div>
                  <div className="mt-12 text-lg">
                    Asociado al calentamiento, la Península Ibérica se verá afectada por la{' '}
                    <strong>aridificación</strong>, que hará que el aumento de las temperaturas
                    venga asociado a sequías más intensas y duraderas con consecuencias asociadas a
                    la mayor incidencia de incendios forestales y erosión del suelo.
                  </div>
                </div>
              </div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  top: -(currentProgress * 10),
                  opacity:
                    activeLayerId === 'sequias'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
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
          </div>

          <Scrollama onStepEnter={onStepEnter} progress onStepProgress={onStepProgress} offset={0}>
            <Step data={{ layerId: 'calentamiento', id: 0 }}>
              <div className="relative w-2/5 p-16 pt-40 opacity-0" style={{ marginTop: '-100vh' }}>
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">Proyecciones de calentamiento</div>
                    <div className="mt-12 text-lg">
                      Asociado al calentamiento, la Península Ibérica se verá afectada por la{' '}
                      <strong>aridificación</strong>, que hará que el aumento de las temperaturas
                      venga asociado a sequías más intensas y duraderas con consecuencias asociadas
                      a la mayor incidencia de incendios forestales y erosión del suelo.
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step data={{ layerId: 'sequias', id: 1 }}>
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">Proyecciones de sequías</div>
                    <div className="mt-12 text-lg">
                      <p>
                        Se espera un{' '}
                        <strong>
                          aumento en la duración y severidad de las sequías veraniegas
                        </strong>
                        , seguidas por periodos de lluvias más cortos pero intensos durante los
                        meses de Octubre y Noviembre.
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
      </Mobile>
    </MediaContextProvider>
  );
};

export default ElRiesgoClimaticoMap;

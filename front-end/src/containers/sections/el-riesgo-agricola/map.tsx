import { useEffect, useState, useCallback, FC } from 'react';
import { Scrollama, Step } from 'react-scrollama';
// import { Controller, Scene } from 'react-scrollmagic';

import Select from 'components/forms/select';
import MapSlider from 'components/map-slider';

import MapRisk from 'containers/map-risk';

// constants
// import { SCENARIOS, MAP_SECTION_HEIGHT } from './constants';

// TODO
const MAP_SECTION_HEIGHT = '200vh';

import {
  SCENARIOS_INCENDIOS_DEHESA,
  YEARS_INCENDIOS_DEHESA,
} from './map-incendios-dehesa/constants';
import {
  SCENARIOS_RENDIMIENTO_CEREALES,
  CROPS_RENDIMIENTO_CEREALES,
  YEARS_RENDIMIENTO_CEREALES,
} from './map-rendimiento-cereales/constants';
import {
  SCENARIOS_RENDIMIENTO_OLIVO,
  YEARS_RENDIMIENTO_OLIVO,
} from './map-rendimiento-olivo/constants';
import { SCENARIOS_SEQUIAS_DEHESA, YEARS_SEQUIAS_DEHESA } from './map-sequias-dehesa/constants';
import {
  SCENARIOS_PROYECCIONES_OLIVO,
  YEARS_PROYECCIONES_OLIVO,
} from './map-zonas-optimas-olivo/constants';
import {
  SCENARIOS_PROYECCIONES_VINO,
  YEARS_PROYECCIONES_VINO,
  INDICATORS_PROYECCIONES_VINO,
} from './map-zonas-optimas-vino/constants';

const YEARS = {
  'incendios-dehesa': YEARS_INCENDIOS_DEHESA,
  'rendimiento-cereal': YEARS_RENDIMIENTO_CEREALES,
  'rendimiento-olivo': YEARS_RENDIMIENTO_OLIVO,
  'sequias-dehesa': YEARS_SEQUIAS_DEHESA,
  'zonas-optimas-olivo': YEARS_PROYECCIONES_OLIVO,
  'zonas-optimas-vino': YEARS_PROYECCIONES_VINO,
};

const SCENARIOS = {
  'incendios-dehesa': SCENARIOS_INCENDIOS_DEHESA,
  'rendimiento-cereal': SCENARIOS_RENDIMIENTO_CEREALES,
  'rendimiento-olivo': SCENARIOS_RENDIMIENTO_OLIVO,
  'sequias-dehesa': SCENARIOS_SEQUIAS_DEHESA,
  'zonas-optimas-olivo': SCENARIOS_PROYECCIONES_OLIVO,
  'zonas-optimas-vino': SCENARIOS_PROYECCIONES_VINO,
};

const CROPS = {
  'rendimiento-cereal': CROPS_RENDIMIENTO_CEREALES,
};

const INDICATORS = {
  'zonas-optimas-vino': INDICATORS_PROYECCIONES_VINO,
};

import type { ElRiesgoAgricolaMapTypes } from './types';

export const ElRiesgoClimaticoMap: FC<ElRiesgoAgricolaMapTypes> = ({
  defaultActiveLayerId = 'cultivos',
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
      // console.log('splitValues:', splitValues);
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

  const getCrops = (layer) => {
    return CROPS[layer];
  };

  const getIndicators = (layer) => {
    return INDICATORS[layer];
  };

  const [activeLayerId, setActiveLayerId] = useState(defaultActiveLayerId);
  const [geoType, setGeoType] = useState('municipios');
  const [scenario, setScenario] = useState(getScenarios(defaultActiveLayerId)?.[0]);
  const [scenarios, setScenarios] = useState(getScenarios(defaultActiveLayerId));
  const [year, setYear] = useState(getYears(defaultActiveLayerId)?.[0]);
  const [years, setYears] = useState(getYears(defaultActiveLayerId));
  const [crop, setCrop] = useState(getCrops(defaultActiveLayerId)?.[0]);
  const [crops, setCrops] = useState(getCrops(defaultActiveLayerId));
  const [indicator, setIndicator] = useState(getIndicators(defaultActiveLayerId)?.[0]);
  const [indicators, setIndicators] = useState(getIndicators(defaultActiveLayerId));
  const [yearSliderValue, setYearSliderValue] = useState(0);
  const [scenarioSliderValue, setScenarioSliderValue] = useState(0);

  const handleActiveLayerChange = useCallback((dataset) => {
    // console.log('changing:', dataset);
    setActiveLayerId(dataset);
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

      if (activeLayerId === 'zonas-optimas-vino') {
        setScenario(
          currentYear && currentYear.value === '2021-2050'
            ? getScenarios(activeLayerId)?.[0]
            : {
                value: 'baseline',
                label: '0°C1',
              },
        );
      }
    },
    [activeLayerId],
  );

  const handleCropChange = useCallback(
    (thisCrop) => {
      setCrop(crops.find((c) => c.value === thisCrop));
    },
    [crops],
  );

  const handleIndicatorChange = useCallback(
    (thisIndicator) => {
      setIndicator(indicators.find((c) => c.value === thisIndicator));
    },
    [indicators],
  );

  const onStepEnter = (e) => {
    console.log('e:', e);
    handleActiveLayerChange(e.data.layerId);
  };

  useEffect(() => {
    setYearSliderValue(0);
    setScenarioSliderValue(0);
    setYears(getYears(activeLayerId));
    setYear(getYears(activeLayerId)?.[0]);
    setScenarios(getScenarios(activeLayerId));
    setScenario(getScenarios(activeLayerId)?.[0]);
    setCrops(getCrops(activeLayerId));
    setCrop(getCrops(activeLayerId)?.[0]);
    setIndicators(getIndicators(activeLayerId));
    setIndicator(getIndicators(activeLayerId)?.[0]);

    // console.log('activeLayerId:', activeLayerId);
    // console.log('getScenarios(activeLayerId):', getScenarios(activeLayerId));
    // console.log('getYears(activeLayerId):', getYears(activeLayerId));
    // console.log('getIndicators(activeLayerId):', getIndicators(activeLayerId));

    if (activeLayerId === 'rendimiento-cereal') {
      setGeoType('comunidades');
    } else {
      setGeoType('municipios');
    }

    if (activeLayerId === 'zonas-optimas-vino') {
      setScenario(
        getYears(activeLayerId)?.[0] && getYears(activeLayerId)?.[0].value === '2021-2050'
          ? getScenarios(activeLayerId)?.[0]
          : {
              value: 'baseline',
              label: '0°C2',
            },
      );
    } else {
      setScenarios(getScenarios(activeLayerId));
      setScenario(getScenarios(activeLayerId)?.[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLayerId]);

  return (
    <div className="relative w-full bg-lightest-grey">
      <div className="sticky top-0 left-0 z-20 w-full h-screen">
        <div className="w-2/5 ">
          <div className="relative ml-16 text-lg font-bold text-gray-400 top-32">En el mapa:</div>
        </div>
        <div className="absolute bottom-0 z-20 w-2/5 p-16">
          <div className="inline-block w-1/2 pr-2">
            {(year && activeLayerId === 'zonas-optimas-vino' && year.value !== '2021-2050') ||
              (scenarios && scenario && (
                <MapSlider
                  values={scenarios}
                  value={scenario}
                  currentValue={scenarioSliderValue}
                  onChange={handleScenarioSliderChange}
                  disabled={scenarios.length === 1}
                />
              ))}
          </div>
          <div className="inline-block w-1/2 pl-2">
            {years && year && (
              <MapSlider
                values={years}
                value={year}
                currentValue={yearSliderValue}
                onChange={handleYearSliderChange}
                disabled={years.length === 1}
              />
            )}
          </div>
          <div>
            <div>
              {crops && crop && (
                <Select
                  id="crops-selection"
                  initialSelected={crop.value}
                  onChange={handleCropChange}
                  options={crops}
                  placeholder="Elige el cultivo"
                  size="base"
                  theme="light"
                />
              )}
              {indicators && indicator && (
                <Select
                  id="indicator-selection"
                  initialSelected={indicator.value}
                  onChange={handleIndicatorChange}
                  options={indicators}
                  placeholder="Elige el indicador"
                  size="base"
                  theme="light"
                />
              )}
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 z-20 w-3/5 h-screen mapa-calentamiento">
          <MapRisk
            activeLayerId={activeLayerId}
            geoType={geoType}
            scenario={scenario}
            year={year}
            crop={crop}
            indicator={indicator}
            allowZoom={false}
          />
        </div>
      </div>
      <Scrollama onStepEnter={onStepEnter} offset={0.5}>
        <Step data={{ layerId: 'cultivos' }}>
          <div className="relative w-2/5 p-16 pt-40" style={{ marginTop: '-100vh' }}>
            <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
              <div className="sticky top-40">
                <div className="font-serif text-2xl">Superficie destinada a los cultivos</div>
                <div className="mt-12">
                  El diseño e implementación de estrategias de prevención debe responder a la
                  diversidad de ambientes y condiciones climáticas en las que prosperan nuestros
                  cultivos (y sus distintas variedades), y también a la variabilidad geográfica de
                  las consecuencias del cambio climático. A continuación, exploramos los efectos del
                  cambio climático en cuatro tipos de zonas agrícolas de interés:{' '}
                  <strong>olivares, viñedos, cereales, y dehesas</strong>.
                </div>
              </div>
            </div>
          </div>
        </Step>
        <Step data={{ layerId: 'cultivos' }}>
          <div className="relative w-2/5 p-16 pt-40">
            <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
              <div className="sticky top-40">
                <div className="font-serif text-2xl">Superficie destinada a los cultivos</div>
                <div className="mt-12">
                  El diseño e implementación de estrategias de prevención debe responder a la
                  diversidad de ambientes y condiciones climáticas en las que prosperan nuestros
                  cultivos (y sus distintas variedades), y también a la variabilidad geográfica de
                  las consecuencias del cambio climático. A continuación, exploramos los efectos del
                  cambio climático en cuatro tipos de zonas agrícolas de interés:{' '}
                  <strong>olivares, viñedos, cereales, y dehesas</strong>.
                </div>
              </div>
            </div>
          </div>
        </Step>
        <Step data={{ layerId: 'zonas-optimas-olivo' }}>
          <div className="w-2/5 p-16 pt-40">
            <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
              <div className="sticky top-40">
                <div className="font-serif text-2xl">
                  Cambio en zonas óptimas para el cultivo de olivo
                </div>
                <div className="mt-12">
                  Las alteraciones en la temporalidad y abundancia de la precipitación van a
                  provocar
                  <strong>
                    cambios en las zonas geográficas óptimas para el cultivo de la aceituna
                  </strong>{' '}
                  (aunque afectará de forma distinta a cada variedad). Por ejemplo, la variedad
                  Picual, que actualmente ocupa 1.867.700 Ha (o el 60% de todo el olivar andaluz)
                  vería su zona óptima de cultivo reducida en un ##%, particularmente en las
                  provincias de {'{'}
                  provincias{'}'}.
                </div>
              </div>
            </div>
          </div>
        </Step>
        <Step data={{ layerId: 'rendimiento-olivo' }}>
          <div className="w-2/5 p-16 pt-40">
            <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
              <div className="sticky top-40">
                <div className="font-serif text-2xl">Proyecciones de rendimiento del olivo</div>
                <div className="mt-12">
                  <p>
                    Además de estos cambios en la distribución geográfica de las zonas óptimas para
                    cultivo, se podría esperar un{' '}
                    <strong>descenso de la producción de hasta el 20%</strong> en la Península
                    Ibérica para los olivares de secano con un incremento de la temperatura de
                    2,5ºC.
                  </p>
                  <p>
                    <strong>
                      Aunque una gestión más eficiente de los recursos hídricos será necesaria para
                      abastecer los olivares, la implementación de medidas urgentes que reduzcan las
                      emisiones de gases efecto invernadero y/o aumenten la captación de carbono
                      atmosférico podrían evitar impactos irreversibles sobre estos cultivos.
                    </strong>
                  </p>
                </div>{' '}
              </div>
            </div>
          </div>
        </Step>
        <Step data={{ layerId: 'rendimiento-cereal' }}>
          <div className="w-2/5 p-16 pt-40">
            <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
              <div className="sticky top-40">
                <div className="font-serif text-2xl">Proyecciones de rendimiento de cereales</div>
                <div className="mt-12">
                  Se espera que el rendimiento del cultivo de trigo{' '}
                  <strong>disminuya en un 5% por cada grado de aumento de temperatura</strong>. Esta
                  pérdida de rendimiento en cultivos de cereales de invierno como el trigo podría
                  ser agravada por la reducción en precipitación y la severidad de la sequía
                  primaveral.
                </div>{' '}
              </div>
            </div>
          </div>
        </Step>
        <Step data={{ layerId: 'zonas-optimas-vino' }}>
          <div className="w-2/5 p-16 pt-40">
            <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
              <div className="sticky top-40">
                <div className="font-serif text-2xl">
                  Cambios en zonas óptimas para la producción de vino de calidad
                </div>
                <div className="mt-12">
                  En Castilla la Mancha, las variedades que más se podrían ver afectadas por el
                  cambio climático son variedades más tempranas como tempranillo o chardonnay ; que
                  particularmente se cultivan en el noreste de la comunidad. Además, los cambios en
                  Aunque el viñedo es una planta fuertemente adaptada a las condiciones
                  mediterráneas y que necesita déficits hídricos moderados para potenciar su
                  calidad, el aumento eventos climáticos extremos como olas de calor, períodos de
                  sequía más extremos, descenso de la precipitación pero cada vez más concentrada en
                  lluvias torrenciales tendría efectos negativos en calidad y rendimiento, además de
                  aumentar la erosión de los suelos.
                </div>
              </div>
            </div>
          </div>
        </Step>
        <Step data={{ layerId: 'sequias-dehesa' }}>
          <div className="w-2/5 p-16 pt-40">
            <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
              <div className="sticky top-40">
                <div className="font-serif text-2xl">
                  Duración de las sequías a lo largo del año en zonas de dehesa.
                </div>
                <div className="mt-12">
                  Extremadura concentra gran parte de la dehesa española, con 1.2 mHa que van a
                  estar expuestas (como otros ecosistemas mediterráneos) al calentamiento y las
                  sequías que serán consecuencia del cambio climático. El aumento de la temperatura
                  o la reducción de las precipitaciones podría derivar por una parte en una menor
                  producción vegetal, y por otra parte en el agostamiento de la vegetación herbácea.
                  Como consecuencia, esto podría reducir la capacidad de carga animal por unidad de
                  superficie y un posible déficit en la calidad de la dieta animal – menor
                  digestibilidad, menor contenido en proteínas.
                </div>
              </div>
            </div>
          </div>
        </Step>
        <Step data={{ layerId: 'incendios-dehesa' }}>
          <div className="w-2/5 p-16 pt-40">
            <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
              <div className="sticky top-40">
                <div className="font-serif text-2xl">Riesgo de incendios en zonas de dehesa</div>
                <div className="mt-12">
                  <p>
                    La pérdida de biodiversidad vegetal causada por la aridez se podría ver
                    empeorada por un mayor riesgo de incendios, que favorecería el crecimiento de
                    especies pirófitas y menos nutritivas para el ganado y especies de interés
                    cinegético.
                  </p>
                  <p>
                    Aunque el volumen de producción en dehesas no es comparable al de zonas de
                    agricultura intensiva, la calidad de los productos y el impacto económico sobre
                    la población local son significativos y reconocidos. Prevenir las consecuencias
                    del cambio climático no solo protegerá la explotación sostenible de las dehesas
                    y sus beneficios sociales, sino también el ecosistema natural.
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

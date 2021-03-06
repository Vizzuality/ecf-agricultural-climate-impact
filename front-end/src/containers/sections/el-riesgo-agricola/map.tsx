import { useState, useCallback, FC } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import { Link } from 'react-scroll';
import cx from 'classnames';

import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

import Select from 'components/forms/select';
import MapSlider from 'components/map-slider';
import Icon from 'components/icon';

import MapRisk from 'containers/map-risk';
import Legend from 'containers/map-risk/legend';

import CHEVRON_DOUBLE_UP_SVG from 'svgs/ui/chevron-double-up.svg?sprite';
import CHEVRON_DOUBLE_DOWN_SVG from 'svgs/ui/chevron-double-down.svg?sprite';

const MAP_SECTION_HEIGHT = '100vh';

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

export const ElRiesgoAgricolaMap: FC<ElRiesgoAgricolaMapTypes> = ({
  defaultActiveLayerId = 'cultivos',
}) => {
  const getYears = (layer) => {
    const years = YEARS[layer];

    const theseYears = years?.map((y) => {
      const splitValues =
        y.value.indexOf(' - ') >= 0
          ? y.value.split(' - ')
          : y.value.indexOf('???') >= 0
          ? y.value.split('???')
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

  const getCrops = (layer) => {
    return CROPS[layer];
  };

  const getIndicators = (layer) => {
    return INDICATORS[layer];
  };

  const [cropSection, setCropSection] = useState(null);
  const [activeLayerId, setActiveLayerId] = useState(defaultActiveLayerId);
  const [bounds, setBounds] = useState('spain');
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
  const [currentStep, setCurrentStep] = useState(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [controlsOpen, setControlsOpen] = useState(false);

  const legendType = indicator?.value.length
    ? `${activeLayerId}_${indicator?.value}`
    : activeLayerId;

  const handleActiveLayerChange = useCallback((data) => {
    setYearSliderValue(0);
    setBounds(data.area);
    setScenarioSliderValue(0);
    setYears(getYears(data.layerId));
    setYear(getYears(data.layerId)?.[0]);
    setScenarios(getScenarios(data.layerId));
    setScenario(getScenarios(data.layerId)?.[0]);
    setCrops(getCrops(data.layerId));
    setCrop(getCrops(data.layerId)?.[0]);
    setIndicators(getIndicators(data.layerId));
    setIndicator(getIndicators(data.layerId)?.[0]);

    if (data.layerId === 'rendimiento-cereal') {
      setGeoType('comunidades');
    } else {
      setGeoType('municipios');
    }

    if (data.layerId === 'zonas-optimas-vino') {
      setScenario(
        getYears(data.layerId)?.[0] && getYears(data.layerId)?.[0].value === '2021-2050'
          ? getScenarios(data.layerId)?.[0]
          : {
              value: 'baseline',
              label: '',
            },
      );
    } else {
      setScenarios(getScenarios(data.layerId));
      setScenario(getScenarios(data.layerId)?.[0]);
    }

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

      if (activeLayerId === 'zonas-optimas-vino') {
        setScenario(
          currentYear && currentYear.value === '2021-2050'
            ? getScenarios(activeLayerId)?.[0]
            : {
                value: 'baseline',
                label: '',
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
    handleActiveLayerChange(e.data);
    setCurrentStep(e.data.stepId);
    setCropSection(e.data.cropSection);
  };

  const onStepProgress = (data) => {
    setCurrentProgress(data.progress);
  };

  const handleControls = () => {
    setControlsOpen(!controlsOpen);
  };

  return (
    <MediaContextProvider>
      <Desktop includeBiggerScreens>
        <div className="relative w-full bg-lightest-grey">
          <div className="sticky top-0 left-0 z-20 w-full h-screen">
            {cropSection?.length && (
              <div className="absolute z-20 w-2/5 top-20">
                <ul className="flex pl-12 ml-1">
                  <li className={`relative px-3 ${cropSection === 'olivar' && 'font-bold'}`}>
                    <Link
                      href="#section-olivar"
                      smooth={true}
                      duration={1000}
                      offset={50}
                      to="section-olivar"
                    >
                      Olivar
                    </Link>
                    {cropSection === 'olivar' && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-3px',
                          left: '50%',
                          width: '30px',
                          height: '1px',
                          background: 'black',
                          transform: 'translateX(-50%)',
                        }}
                      ></div>
                    )}
                  </li>
                  <li className={`relative px-3 ${cropSection === 'cereal' && 'font-bold'}`}>
                    <Link
                      href="#section-cereal"
                      smooth={true}
                      duration={1000}
                      offset={50}
                      to="section-cereal"
                    >
                      Cereales
                    </Link>
                    {cropSection === 'cereal' && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-3px',
                          left: '50%',
                          width: '30px',
                          height: '1px',
                          background: 'black',
                          transform: 'translateX(-50%)',
                        }}
                      ></div>
                    )}
                  </li>
                  <li className={`relative px-3 ${cropSection === 'vinedo' && 'font-bold'}`}>
                    <Link
                      href="#section-vinedo"
                      smooth={true}
                      duration={1000}
                      offset={50}
                      to="section-vinedo"
                    >
                      Vi??edo
                    </Link>
                    {cropSection === 'vinedo' && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-3px',
                          left: '50%',
                          width: '30px',
                          height: '1px',
                          background: 'black',
                          transform: 'translateX(-50%)',
                        }}
                      ></div>
                    )}
                  </li>
                  <li className={`relative px-3 ${cropSection === 'dehesa' && 'font-bold'}`}>
                    <Link
                      href="#section-dehesa"
                      smooth={true}
                      duration={1000}
                      offset={50}
                      to="section-dehesa"
                    >
                      Dehesa
                    </Link>
                    {cropSection === 'dehesa' && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-3px',
                          left: '50%',
                          width: '30px',
                          height: '1px',
                          background: 'black',
                          transform: 'translateX(-50%)',
                        }}
                      ></div>
                    )}
                  </li>
                </ul>
              </div>
            )}
            <div className="w-2/5 ">
              <div className="relative ml-16 text-lg font-bold text-gray-400 top-32">
                En el mapa:
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
                    <div className="pb-2 text-sm text-gray-400">A??o</div>
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
              {crops && crop && (
                <div className="mt-4">
                  <Select
                    id="crops-selection"
                    initialSelected={crop.value}
                    onChange={handleCropChange}
                    options={crops}
                    placeholder="Elige el cultivo"
                    size="base"
                    theme="light"
                  />
                </div>
              )}
              {indicators && indicator && (
                <div className="mt-4">
                  <Select
                    id="indicator-selection"
                    initialSelected={indicator.value}
                    onChange={handleIndicatorChange}
                    options={indicators}
                    placeholder="Elige el indicador"
                    size="base"
                    theme="light"
                  />
                </div>
              )}
            </div>
            <div className="absolute top-0 right-0 z-20 w-3/5 h-screen mapa-calentamiento">
              <MapRisk
                activeLayerId={activeLayerId}
                geoType={geoType}
                scenario={scenario}
                year={year}
                crop={crop}
                indicator={indicator}
                allowZoom
                bounds={bounds}
                legend={activeLayerId}
              />
            </div>
            <div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  zIndex: currentStep === 'cultivos' ? 10 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'cultivos'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-2xl">Superficie destinada a los cultivos</div>
                  <div className="mt-12 text-lg">
                    El dise??o e implementaci??n de estrategias de prevenci??n debe responder a la
                    diversidad de ambientes y condiciones clim??ticas en las que prosperan nuestros
                    cultivos (y sus distintas variedades), y tambi??n a la variabilidad geogr??fica de
                    las consecuencias del cambio clim??tico. A continuaci??n, exploramos los efectos
                    del cambio clim??tico en cuatro tipos de zonas agr??colas de inter??s:{' '}
                    <strong>olivares, vi??edos, cereales, y dehesas</strong>.
                  </div>
                </div>
              </div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  zIndex: currentStep === 'cultivos-olivar-1' ? 10 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'cultivos-olivar-1'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-2xl">Olivar</div>
                  <div className="mt-12 text-lg">
                    <p>
                      Cultivado desde el tiempo de los fenicios y los romanos, la producci??n
                      ole??cola ha convertido a Espa??a en el principal productor y exportador mundial
                      de aceite de oliva.
                    </p>
                    <p>
                      <strong>
                        En Andaluc??a est?? concentrando un 60% del ??rea destinada a este cultivo del
                        pa??s.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  zIndex: currentStep === 'cultivos-olivar-2' ? 10 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'cultivos-olivar-2'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="mt-12 text-lg">
                    <p>
                      Sin embargo, <strong>Andaluc??a</strong> ???al igual que todo el sureste
                      peninsular??? tambi??n es una de las regiones que van a sufrir mayor{' '}
                      <strong>riesgo de aridificaci??n</strong> debido a la disminuci??n generalizada
                      de precipitaciones y el aumento de la duraci??n y severidad de las sequ??as.
                    </p>
                    <p>
                      Estos cambios en la precipitaci??n afectar??n a{' '}
                      <strong>olivares tanto irrigados como de secano</strong>, disminuyendo su
                      rendimiento en al menos un 3.5% y 7% si se superan los 1,5 ??C en m??s de 11% y
                      23% respectivamente a partir de los 3 ??C de calentamiento.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  zIndex: currentStep === 'zonas-optimas-olivo' ? 10 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'zonas-optimas-olivo'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-2xl">
                    Cambio en zonas ??ptimas para el cultivo de olivo
                  </div>
                  <div className="mt-12 text-lg">
                    Las alteraciones en la temporalidad y abundancia de la precipitaci??n van a
                    provocar{' '}
                    <strong>
                      cambios en las zonas geogr??ficas ??ptimas para el cultivo de la aceituna
                    </strong>{' '}
                    (aunque afectar?? de forma distinta a cada variedad). Las variedades locales como
                    el Lech??n, Manzanilla y Picudo ser??n las m??s afectadas viendo su zona ??ptima de
                    cultivo reducida en m??s de un 90% para 2050.
                  </div>
                </div>
              </div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  zIndex: currentStep === 'rendimiento-olivo' ? 10 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'rendimiento-olivo'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-2xl">Proyecciones de rendimiento del olivo</div>
                  <div className="mt-12 text-lg">
                    <p>
                      Adem??s de estos cambios en la distribuci??n geogr??fica de las zonas ??ptimas
                      para cultivo, se podr??a esperar un{' '}
                      <strong>descenso de la producci??n de hasta el 20%</strong> en las principales
                      zonas productoras para los olivares de secano con un incremento de la
                      temperatura de 2,5??C.
                    </p>
                    <p>
                      <strong>
                        Aunque una gesti??n m??s eficiente de los recursos h??dricos ser?? necesaria
                        para abastecer los olivares, la implementaci??n de medidas urgentes que
                        reduzcan las emisiones de gases efecto invernadero y/o aumenten la captaci??n
                        de carbono atmosf??rico podr??an evitar impactos irreversibles sobre estos
                        cultivos.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  zIndex: currentStep === 'cultivos-cereal-1' ? 10 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'cultivos-cereal-1'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-2xl">Cereales</div>
                  <div className="mt-12 text-lg">
                    <p>
                      La producci??n de cereales es la m??s extendida de todos los cultivos en Espa??a
                      (6MHa). El 90% de la producci??n se destina a cereales de invierno, trigo y
                      cebada principalmente, casi en su totalidad (90%) de secano, y la mayor??a se
                      destina a piensos.
                    </p>
                    <p>
                      <strong>
                        En Castilla y Le??n, donde la superficie destinada al cultivo de cereales es
                        de aproximadamente 2MHa
                      </strong>
                      , se predice que las temperaturas podr??an aumentar entre 1,6 y 2??C en los
                      pr??ximos 30 a??os.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  zIndex: currentStep === 'rendimiento-cereal-1' ? 10 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'rendimiento-cereal-1'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-2xl">Proyecciones de rendimiento de cereales</div>
                  <div className="mt-12 text-lg">
                    Se espera que el rendimiento del cultivo de cereales en el mundo{' '}
                    <strong>disminuya en un 5% por cada grado de aumento de temperatura</strong>. En
                    Espa??a, el aumento de la sequ??a ser??a la principal causa de la p??rdida de
                    rendimiento, que podr??a ser agravada por otras causas como incremento de los
                    da??os por pedrisco o plagas.
                  </div>
                </div>
              </div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  zIndex: currentStep === 'rendimiento-cereal-2' ? 10 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'rendimiento-cereal-2'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="mt-12 text-lg">
                    Las condiciones derivadas del cambio clim??tico obligar??an a tomar medidas de
                    adaptaci??n al cultivo de cereales como cambios en las variedades de cultivos,
                    diferentes fechas de siembra y cosecha, cambios en el grado de mecanizaci??n o
                    diferentes tipos de nutrientes y fertilizantes. Por lo que se espera que el
                    Cambio Clim??tico aumente la vulnerabilidad del sector si no existe una
                    disminuci??n real de la emisi??n de gases de efecto invernadero.
                  </div>
                </div>
              </div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  zIndex: currentStep === 'cultivos-vinedo' ? 10 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'cultivos-vinedo'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-2xl">Vi??edo</div>
                  <div className="mt-12 text-lg">
                    La calidad de las multiples variedades del vino espa??ol est?? reconocida
                    globalmente. Esta diversidad en variedades de uva y la calidad final del vino
                    responde a las distintas condiciones ambientales del territorio espa??ol: suelos,
                    reg??menes de precipitaci??n, variaciones t??rmicas diurnas y estacionales,
                    frecuencia e intensidad de heladas...
                  </div>
                </div>
              </div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  zIndex: currentStep === 'zonas-optimas-vino-1' ? 10 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'zonas-optimas-vino-1'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-2xl">
                    Cambios en zonas ??ptimas para la producci??n de vino de calidad
                  </div>
                  <div className="mt-12 text-lg">
                    En Castilla la Mancha, las variedades que m??s se podr??an ver afectadas por el
                    cambio clim??tico son variedades m??s tempranas como tempranillo o chardonnay, que
                    ver??an reducida la superficie ??ptima para vinos de calidad en un 50%.
                  </div>
                </div>
              </div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  zIndex: currentStep === 'zonas-optimas-vino-2' ? 10 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'zonas-optimas-vino-2'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="mt-12 text-lg">
                    Aunque el vi??edo es una planta fuertemente adaptada a las condiciones
                    mediterr??neas y que necesita d??ficits h??dricos moderados para potenciar su
                    calidad, el aumento eventos clim??ticos extremos como olas de calor, per??odos de
                    sequ??a m??s extremos, descenso de la precipitaci??n pero cada vez m??s concentrada
                    en lluvias torrenciales tendr??a efectos negativos en calidad y rendimiento,
                    adem??s de aumentar la erosi??n de los suelos.
                  </div>
                </div>
              </div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  zIndex: currentStep === 'cultivos-dehesa' ? 10 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'cultivos-dehesa'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-2xl">Dehesa</div>
                  <div className="mt-12 text-lg">
                    <p>
                      La dehesa es un ejemplo ideal de gesti??n sostenible de un ecosistema
                      mediterr??neo con una <strong>extensi??n de 2.5 mHa</strong> particularmente
                      centradas en el suroeste de la pen??nsula donde conviven la actividad agr??cola,
                      ganadera, y forestal.
                    </p>
                    <p>
                      Dominada por pastos y con encinas, alcornoques, hayas, y pinos dispersos, la
                      dehesa constituye el medio para el desarrollo de explotaciones de cerdos,
                      ovejas, caballos y toros de gran valor a nivel nacional.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  zIndex: currentStep === 'sequias-dehesa' ? 10 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'sequias-dehesa'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-2xl">
                    Duraci??n de las sequ??as a lo largo del a??o en zonas de dehesa
                  </div>
                  <div className="mt-12 text-lg">
                    <p>
                      Extremadura concentra gran parte de la dehesa espa??ola, con 1.2 mHa que van a
                      estar expuestas (como otros ecosistemas mediterr??neos) al calentamiento y las
                      sequ??as que ser??n consecuencia del cambio clim??tico.
                    </p>
                    <p>
                      El aumento de la temperatura o la reducci??n de las precipitaciones podr??a
                      derivar por una parte en una menor producci??n vegetal, y por otra parte en el
                      agostamiento de la vegetaci??n herb??cea. Como consecuencia, esto podr??a reducir
                      la capacidad de carga animal por unidad de superficie y un posible d??ficit en
                      la calidad de la dieta animal ??? menor digestibilidad, menor contenido en
                      prote??nas.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute w-2/5 p-16 pt-40 mt-2"
                style={{
                  zIndex: currentStep === 'incendios-dehesa' ? 10 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'incendios-dehesa'
                      ? currentProgress <= 0.5
                        ? currentProgress * 10
                        : (1 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-2xl">Riesgo de incendios en zonas de dehesa</div>
                  <div className="mt-12 text-lg">
                    <p>
                      La p??rdida de biodiversidad vegetal causada por la aridez se podr??a ver
                      empeorada por un mayor riesgo de incendios, que favorecer??a el crecimiento de
                      especies pir??fitas y menos nutritivas para el ganado y especies de inter??s
                      cineg??tico.
                    </p>
                    <p>
                      Aunque el volumen de producci??n en dehesas no es comparable al de zonas de
                      agricultura intensiva, la calidad de los productos y el impacto econ??mico
                      sobre la poblaci??n local son significativos y reconocidos. Prevenir las
                      consecuencias del cambio clim??tico no solo proteger?? la explotaci??n sostenible
                      de las dehesas y sus beneficios sociales, sino tambi??n el ecosistema natural.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SCROLLAMA */}
          <Scrollama
            onStepEnter={onStepEnter}
            progress
            onStepProgress={onStepProgress}
            offset={0.5}
          >
            <Step data={{ layerId: 'cultivos', stepId: 'cultivos', area: 'spain' }}>
              <div className="relative w-2/5 p-16 pt-40 opacity-0" style={{ marginTop: '-100vh' }}>
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">Superficie destinada a los cultivos</div>
                    <div className="mt-12 text-lg">
                      El dise??o e implementaci??n de estrategias de prevenci??n debe responder a la
                      diversidad de ambientes y condiciones clim??ticas en las que prosperan nuestros
                      cultivos (y sus distintas variedades), y tambi??n a la variabilidad geogr??fica
                      de las consecuencias del cambio clim??tico. A continuaci??n, exploramos los
                      efectos del cambio clim??tico en cuatro tipos de zonas agr??colas de inter??s:{' '}
                      <strong>olivares, vi??edos, cereales, y dehesas</strong>.
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'cultivos-olivar',
                stepId: 'cultivos-olivar-1',
                area: 'andalucia',
                cropSection: 'olivar',
              }}
            >
              <div className="relative w-2/5 p-16 pt-40 opacity-0" id="section-olivar">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">Olivar</div>
                    <div className="mt-12 text-lg">
                      <p>
                        Cultivado desde el tiempo de los fenicios y los romanos, la producci??n
                        ole??cola ha convertido a Espa??a en el principal productor y exportador
                        mundial de aceite de oliva.
                      </p>
                      <p>
                        <strong>
                          En Andaluc??a est?? concentrando un 60% del ??rea destinada a este cultivo
                          del pa??s.
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'cultivos-olivar',
                stepId: 'cultivos-olivar-2',
                area: 'andalucia',
                cropSection: 'olivar',
              }}
            >
              <div className="relative w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="mt-12 text-lg">
                      <p>
                        Sin embargo, <strong>Andaluc??a</strong> ???al igual que todo el sureste
                        peninsular??? tambi??n es una de las regiones que van a sufrir mayor{' '}
                        <strong>riesgo de aridificaci??n</strong> debido a la disminuci??n
                        generalizada de precipitaciones y el aumento de la duraci??n y severidad de
                        las sequ??as.
                      </p>
                      <p>
                        Estos cambios en la precipitaci??n afectar??n a{' '}
                        <strong>olivares tanto irrigados como de secano</strong>, disminuyendo su
                        rendimiento en al menos un 3.5% y 7% si se superan los 1,5 ??C en m??s de 11%
                        y 23% respectivamente a partir de los 3 ??C de calentamiento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'zonas-optimas-olivo',
                stepId: 'zonas-optimas-olivo',
                area: 'andalucia',
                cropSection: 'olivar',
              }}
            >
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">
                      Cambio en zonas ??ptimas para el cultivo de olivo
                    </div>
                    <div className="mt-12 text-lg">
                      Las alteraciones en la temporalidad y abundancia de la precipitaci??n van a
                      provocar{' '}
                      <strong>
                        cambios en las zonas geogr??ficas ??ptimas para el cultivo de la aceituna
                      </strong>{' '}
                      (aunque afectar?? de forma distinta a cada variedad). Las variedades locales
                      como el Lech??n, Manzanilla y Picudo ser??n las m??s afectadas viendo su zona
                      ??ptima de cultivo reducida en m??s de un 90% para 2050.
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'rendimiento-olivo',
                stepId: 'rendimiento-olivo',
                area: 'andalucia',
                cropSection: 'olivar',
              }}
            >
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">Proyecciones de rendimiento del olivo</div>
                    <div className="mt-12 text-lg">
                      <p>
                        Adem??s de estos cambios en la distribuci??n geogr??fica de las zonas ??ptimas
                        para cultivo, se podr??a esperar un{' '}
                        <strong>descenso de la producci??n de hasta el 20%</strong> en las
                        principales zonas productoras para los olivares de secano con un incremento
                        de la temperatura de 2,5??C.
                      </p>
                      <p>
                        <strong>
                          Aunque una gesti??n m??s eficiente de los recursos h??dricos ser?? necesaria
                          para abastecer los olivares, la implementaci??n de medidas urgentes que
                          reduzcan las emisiones de gases efecto invernadero y/o aumenten la
                          captaci??n de carbono atmosf??rico podr??an evitar impactos irreversibles
                          sobre estos cultivos.
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'cultivos-cereal',
                stepId: 'cultivos-cereal-1',
                area: 'castilla_leon',
                cropSection: 'cereal',
              }}
            >
              <div className="relative w-2/5 p-16 pt-40 opacity-0" id="section-cereal">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">Cereales</div>
                    <div className="mt-12 text-lg">
                      <p>
                        La producci??n de cereales es la m??s extendida de todos los cultivos en
                        Espa??a (6MHa). El 90% de la producci??n se destina a cereales de invierno,
                        trigo y cebada principalmente, casi en su totalidad (90%) de secano, y la
                        mayor??a se destina a piensos.
                      </p>
                      <p>
                        <strong>
                          En Castilla y Le??n, donde la superficie destinada al cultivo de cereales
                          es de aproximadamente 2MHa
                        </strong>
                        , se predice que las temperaturas podr??an aumentar entre 1,6 y 2??C en los
                        pr??ximos 30 a??os.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'rendimiento-cereal',
                stepId: 'rendimiento-cereal-1',
                area: 'castilla_leon',
                cropSection: 'cereal',
              }}
            >
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">
                      Proyecciones de rendimiento de cereales
                    </div>
                    <div className="mt-12 text-lg">
                      Se espera que el rendimiento del cultivo de cereales en el mundo{' '}
                      <strong>disminuya en un 5% por cada grado de aumento de temperatura</strong>.
                      En Espa??a, el aumento de la sequ??a ser??a la principal causa de la p??rdida de
                      rendimiento, que podr??a ser agravada por otras causas como incremento de los
                      da??os por pedrisco o plagas.
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'rendimiento-cereal',
                stepId: 'rendimiento-cereal-2',
                area: 'castilla_leon',
                cropSection: 'cereal',
              }}
            >
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="mt-12 text-lg">
                      Las condiciones derivadas del cambio clim??tico obligar??an a tomar medidas de
                      adaptaci??n al cultivo de cereales como cambios en las variedades de cultivos,
                      diferentes fechas de siembra y cosecha, cambios en el grado de mecanizaci??n o
                      diferentes tipos de nutrientes y fertilizantes. Por lo que se espera que el
                      Cambio Clim??tico aumente la vulnerabilidad del sector si no existe una
                      disminuci??n real de la emisi??n de gases de efecto invernadero
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'cultivos-vinedo',
                stepId: 'cultivos-vinedo',
                area: 'castilla_la_mancha',
                cropSection: 'vinedo',
              }}
            >
              <div className="relative w-2/5 p-16 pt-40 opacity-0" id="section-vinedo">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">Vi??edo</div>
                    <div className="mt-12 text-lg">
                      La calidad de las multiples variedades del vino espa??ol est?? reconocida
                      globalmente. Esta diversidad en variedades de uva y la calidad final del vino
                      responde a las distintas condiciones ambientales del territorio espa??ol:
                      suelos, reg??menes de precipitaci??n, variaciones t??rmicas diurnas y
                      estacionales, frecuencia e intensidad de heladas...
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'zonas-optimas-vino',
                stepId: 'zonas-optimas-vino-1',
                area: 'castilla_la_mancha',
                cropSection: 'vinedo',
              }}
            >
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">
                      Cambios en zonas ??ptimas para la producci??n de vino de calidad
                    </div>
                    <div className="mt-12 text-lg">
                      <p>
                        En Castilla la Mancha, las variedades que m??s se podr??an ver afectadas por
                        el cambio clim??tico son variedades m??s tempranas como tempranillo o
                        chardonnay, que ver??an reducida la superficie ??ptima para vinos de calidad
                        en un 50%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'zonas-optimas-vino',
                stepId: 'zonas-optimas-vino-2',
                area: 'castilla_la_mancha',
                cropSection: 'vinedo',
              }}
            >
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="mt-12 text-lg">
                      <p>
                        Aunque el vi??edo es una planta fuertemente adaptada a las condiciones
                        mediterr??neas y que necesita d??ficits h??dricos moderados para potenciar su
                        calidad, el aumento eventos clim??ticos extremos como olas de calor, per??odos
                        de sequ??a m??s extremos, descenso de la precipitaci??n pero cada vez m??s
                        concentrada en lluvias torrenciales tendr??a efectos negativos en calidad y
                        rendimiento, adem??s de aumentar la erosi??n de los suelos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'cultivos-dehesa',
                stepId: 'cultivos-dehesa',
                area: 'extremadura',
                cropSection: 'dehesa',
              }}
            >
              <div className="relative w-2/5 p-16 pt-40 opacity-0" id="section-dehesa">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">Dehesa</div>
                    <div className="mt-12 text-lg">
                      <p>
                        La dehesa es un ejemplo ideal de gesti??n sostenible de un ecosistema
                        mediterr??neo con una <strong>extensi??n de 2.5 mHa</strong> particularmente
                        centradas en el suroeste de la pen??nsula donde conviven la actividad
                        agr??cola, ganadera, y forestal.
                      </p>
                      <p>
                        Dominada por pastos y con encinas, alcornoques, hayas, y pinos dispersos, la
                        dehesa constituye el medio para el desarrollo de explotaciones de cerdos,
                        ovejas, caballos y toros de gran valor a nivel nacional.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'sequias-dehesa',
                stepId: 'sequias-dehesa',
                area: 'extremadura',
                cropSection: 'dehesa',
              }}
            >
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">
                      Duraci??n de las sequ??as a lo largo del a??o en zonas de dehesa.
                    </div>
                    <div className="mt-12 text-lg">
                      <p>
                        Extremadura concentra gran parte de la dehesa espa??ola, con 1.2 mHa que van
                        a estar expuestas (como otros ecosistemas mediterr??neos) al calentamiento y
                        las sequ??as que ser??n consecuencia del cambio clim??tico.
                      </p>
                      <p>
                        El aumento de la temperatura o la reducci??n de las precipitaciones podr??a
                        derivar por una parte en una menor producci??n vegetal, y por otra parte en
                        el agostamiento de la vegetaci??n herb??cea. Como consecuencia, esto podr??a
                        reducir la capacidad de carga animal por unidad de superficie y un posible
                        d??ficit en la calidad de la dieta animal ??? menor digestibilidad, menor
                        contenido en prote??nas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'incendios-dehesa',
                stepId: 'incendios-dehesa',
                area: 'extremadura',
                cropSection: 'dehesa',
              }}
            >
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">
                      Riesgo de incendios en zonas de dehesa
                    </div>
                    <div className="mt-12 text-lg">
                      <p>
                        La p??rdida de biodiversidad vegetal causada por la aridez se podr??a ver
                        empeorada por un mayor riesgo de incendios, que favorecer??a el crecimiento
                        de especies pir??fitas y menos nutritivas para el ganado y especies de
                        inter??s cineg??tico.
                      </p>
                      <p>
                        Aunque el volumen de producci??n en dehesas no es comparable al de zonas de
                        agricultura intensiva, la calidad de los productos y el impacto econ??mico
                        sobre la poblaci??n local son significativos y reconocidos. Prevenir las
                        consecuencias del cambio clim??tico no solo proteger?? la explotaci??n
                        sostenible de las dehesas y sus beneficios sociales, sino tambi??n el
                        ecosistema natural.
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
            <div className="relative z-30 ml-4 text-lg font-bold text-gray-400 top-20">
              En el mapa:
            </div>
            <div
              className="absolute bottom-0 z-30 w-full bg-white bg-opacity-90"
              style={{ zIndex: 999 }}
            >
              {((scenarios && scenario) ||
                (years && year) ||
                (crops && crop) ||
                (indicators && indicator)) && (
                <>
                  <div
                    className="flex items-center justify-between px-4 py-2 border-b"
                    onClick={handleControls}
                  >
                    <span>Controladores</span>
                    <Icon
                      icon={controlsOpen ? CHEVRON_DOUBLE_DOWN_SVG : CHEVRON_DOUBLE_UP_SVG}
                    ></Icon>
                  </div>
                  <div
                    className={cx({
                      'px-4 overflow-hidden transition-all duration-500': true,
                      'max-h-0': !controlsOpen,
                      'max-h-40 py-4 ': controlsOpen,
                    })}
                  >
                    <div className="inline-block w-1/2 pr-2">
                      {scenarios && scenario && (
                        <>
                          <div className="pb-2 text-sm text-gray-400">
                            Escenario de calentamiento
                          </div>
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
                          <div className="pb-2 text-sm text-gray-400">A??o</div>
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
                    {crops && crop && (
                      <div className="pb-2 mt-4">
                        <Select
                          id="crops-selection"
                          initialSelected={crop.value}
                          onChange={handleCropChange}
                          options={crops}
                          placeholder="Elige el cultivo"
                          size="base"
                          theme="light"
                        />
                      </div>
                    )}
                    {indicators && indicator && (
                      <div className="pb-2 mt-4">
                        <Select
                          id="indicator-selection"
                          initialSelected={indicator.value}
                          onChange={handleIndicatorChange}
                          options={indicators}
                          placeholder="Elige el indicador"
                          size="base"
                          theme="light"
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
              <div className="relative w-full bg-white">
                <Legend legendType={legendType} />
              </div>
            </div>
            <div className="absolute top-0 right-0 z-20 w-full h-screen mapa-calentamiento">
              <MapRisk
                activeLayerId={activeLayerId}
                geoType={geoType}
                scenario={scenario}
                year={year}
                crop={crop}
                indicator={indicator}
                allowZoom
                bounds={bounds}
                legend={activeLayerId}
                mobile={true}
              />
            </div>
            <div>
              <div
                className="absolute w-full p-4 pt-24 mt-4"
                style={{
                  zIndex: currentStep === 'cultivos' ? 80 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'cultivos'
                      ? currentProgress <= 0.25
                        ? currentProgress * 10
                        : (1 - 0.5 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-lg">Superficie destinada a los cultivos</div>
                  <div className="p-2 mt-12 text-sm bg-white bg-opacity-70">
                    El dise??o e implementaci??n de estrategias de prevenci??n debe responder a la
                    diversidad de ambientes y condiciones clim??ticas en las que prosperan nuestros
                    cultivos (y sus distintas variedades), y tambi??n a la variabilidad geogr??fica de
                    las consecuencias del cambio clim??tico. A continuaci??n, exploramos los efectos
                    del cambio clim??tico en cuatro tipos de zonas agr??colas de inter??s:{' '}
                    <strong>olivares, vi??edos, cereales, y dehesas</strong>.
                  </div>
                </div>
              </div>
              <div
                className="absolute z-50 w-full p-4 pt-24 mt-4"
                style={{
                  zIndex: currentStep === 'cultivos-olivar-1' ? 80 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'cultivos-olivar-1'
                      ? currentProgress <= 0.25
                        ? currentProgress * 10
                        : (1 - 0.5 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-lg">Olivar</div>
                  <div className="p-2 mt-12 text-sm bg-white bg-opacity-70">
                    <p>
                      Cultivado desde el tiempo de los fenicios y los romanos, la producci??n
                      ole??cola ha convertido a Espa??a en el principal productor y exportador mundial
                      de aceite de oliva.
                    </p>
                    <p>
                      <strong>
                        En Andaluc??a est?? concentrando un 60% del ??rea destinada a este cultivo del
                        pa??s.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute z-50 w-full p-4 pt-24 mt-4"
                style={{
                  zIndex: currentStep === 'cultivos-olivar-2' ? 80 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'cultivos-olivar-2'
                      ? currentProgress <= 0.25
                        ? currentProgress * 10
                        : (1 - 0.5 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="p-2 mt-12 text-sm bg-white bg-opacity-70">
                    <p>
                      Sin embargo, <strong>Andaluc??a</strong> ???al igual que todo el sureste
                      peninsular??? tambi??n es una de las regiones que van a sufrir mayor{' '}
                      <strong>riesgo de aridificaci??n</strong> debido a la disminuci??n generalizada
                      de precipitaciones y el aumento de la duraci??n y severidad de las sequ??as.
                    </p>
                    <p>
                      Estos cambios en la precipitaci??n afectar??n a{' '}
                      <strong>olivares tanto irrigados como de secano</strong>, disminuyendo su
                      rendimiento en al menos un 3.5% y 7% si se superan los 1,5 ??C en m??s de 11% y
                      23% respectivamente a partir de los 3 ??C de calentamiento.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute z-50 w-full p-4 pt-24 mt-4"
                style={{
                  zIndex: currentStep === 'zonas-optimas-olivo' ? 80 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'zonas-optimas-olivo'
                      ? currentProgress <= 0.25
                        ? currentProgress * 10
                        : (1 - 0.5 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-lg">
                    Cambio en zonas ??ptimas para el cultivo de olivo
                  </div>
                  <div className="p-2 mt-12 text-sm bg-white bg-opacity-70">
                    Las alteraciones en la temporalidad y abundancia de la precipitaci??n van a
                    provocar{' '}
                    <strong>
                      cambios en las zonas geogr??ficas ??ptimas para el cultivo de la aceituna
                    </strong>{' '}
                    (aunque afectar?? de forma distinta a cada variedad). Las variedades locales como
                    el Lech??n, Manzanilla y Picudo ser??n las m??s afectadas viendo su zona ??ptima de
                    cultivo reducida en m??s de un 90% para 2050.
                  </div>
                </div>
              </div>
              <div
                className="absolute z-50 w-full p-4 pt-24 mt-4"
                style={{
                  zIndex: currentStep === 'rendimiento-olivo' ? 80 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'rendimiento-olivo'
                      ? currentProgress <= 0.25
                        ? currentProgress * 10
                        : (1 - 0.5 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-lg">Proyecciones de rendimiento del olivo</div>
                  <div className="p-2 mt-12 text-sm bg-white bg-opacity-70">
                    <p>
                      Adem??s de estos cambios en la distribuci??n geogr??fica de las zonas ??ptimas
                      para cultivo, se podr??a esperar un{' '}
                      <strong>descenso de la producci??n de hasta el 20%</strong> en las principales
                      zonas productoras para los olivares de secano con un incremento de la
                      temperatura de 2,5??C.
                    </p>
                    <p>
                      <strong>
                        Aunque una gesti??n m??s eficiente de los recursos h??dricos ser?? necesaria
                        para abastecer los olivares, la implementaci??n de medidas urgentes que
                        reduzcan las emisiones de gases efecto invernadero y/o aumenten la captaci??n
                        de carbono atmosf??rico podr??an evitar impactos irreversibles sobre estos
                        cultivos.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute z-50 w-full p-4 pt-24 mt-4"
                style={{
                  zIndex: currentStep === 'cultivos-cereal-1' ? 80 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'cultivos-cereal-1'
                      ? currentProgress <= 0.25
                        ? currentProgress * 10
                        : (1 - 0.5 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-lg">Cereales</div>
                  <div className="p-2 mt-12 text-sm bg-white bg-opacity-70">
                    <p>
                      La producci??n de cereales es la m??s extendida de todos los cultivos en Espa??a
                      (6MHa). El 90% de la producci??n se destina a cereales de invierno, trigo y
                      cebada principalmente, casi en su totalidad (90%) de secano, y la mayor??a se
                      destina a piensos.
                    </p>
                    <p>
                      <strong>
                        En Castilla y Le??n, donde la superficie destinada al cultivo de cereales es
                        de aproximadamente 2MHa
                      </strong>
                      , se predice que las temperaturas podr??an aumentar entre 1,6 y 2??C en los
                      pr??ximos 30 a??os.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute z-50 w-full p-4 pt-24 mt-4"
                style={{
                  zIndex: currentStep === 'rendimiento-cereal-1' ? 80 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'rendimiento-cereal-1'
                      ? currentProgress <= 0.25
                        ? currentProgress * 10
                        : (1 - 0.5 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-lg">Proyecciones de rendimiento de cereales</div>
                  <div className="p-2 mt-12 text-sm bg-white bg-opacity-70">
                    Se espera que el rendimiento del cultivo de cereales en el mundo{' '}
                    <strong>disminuya en un 5% por cada grado de aumento de temperatura</strong>. En
                    Espa??a, el aumento de la sequ??a ser??a la principal causa de la p??rdida de
                    rendimiento, que podr??a ser agravada por otras causas como incremento de los
                    da??os por pedrisco o plagas.
                  </div>
                </div>
              </div>
              <div
                className="absolute z-50 w-full p-4 pt-24 mt-4"
                style={{
                  zIndex: currentStep === 'rendimiento-cereal-2' ? 80 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'rendimiento-cereal-2'
                      ? currentProgress <= 0.25
                        ? currentProgress * 10
                        : (1 - 0.5 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="p-2 mt-12 text-sm bg-white bg-opacity-70">
                    Las condiciones derivadas del cambio clim??tico obligar??an a tomar medidas de
                    adaptaci??n al cultivo de cereales como cambios en las variedades de cultivos,
                    diferentes fechas de siembra y cosecha, cambios en el grado de mecanizaci??n o
                    diferentes tipos de nutrientes y fertilizantes. Por lo que se espera que el
                    Cambio Clim??tico aumente la vulnerabilidad del sector si no existe una
                    disminuci??n real de la emisi??n de gases de efecto invernadero.
                  </div>
                </div>
              </div>
              <div
                className="absolute z-50 w-full p-4 pt-24 mt-4"
                style={{
                  zIndex: currentStep === 'cultivos-vinedo' ? 80 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'cultivos-vinedo'
                      ? currentProgress <= 0.25
                        ? currentProgress * 10
                        : (1 - 0.5 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-lg">Vi??edo</div>
                  <div className="p-2 mt-12 text-sm bg-white bg-opacity-70">
                    La calidad de las multiples variedades del vino espa??ol est?? reconocida
                    globalmente. Esta diversidad en variedades de uva y la calidad final del vino
                    responde a las distintas condiciones ambientales del territorio espa??ol: suelos,
                    reg??menes de precipitaci??n, variaciones t??rmicas diurnas y estacionales,
                    frecuencia e intensidad de heladas...
                  </div>
                </div>
              </div>
              <div
                className="absolute z-50 w-full p-4 pt-24 mt-4"
                style={{
                  zIndex: currentStep === 'zonas-optimas-vino-1' ? 80 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'zonas-optimas-vino-1'
                      ? currentProgress <= 0.25
                        ? currentProgress * 10
                        : (1 - 0.5 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-lg">
                    Cambios en zonas ??ptimas para la producci??n de vino de calidad
                  </div>
                  <div className="p-2 mt-12 text-sm bg-white bg-opacity-70">
                    En Castilla la Mancha, las variedades que m??s se podr??an ver afectadas por el
                    cambio clim??tico son variedades m??s tempranas como tempranillo o chardonnay, que
                    ver??an reducida la superficie ??ptima para vinos de calidad en un 50%.
                  </div>
                </div>
              </div>
              <div
                className="absolute z-50 w-full p-4 pt-24 mt-4"
                style={{
                  zIndex: currentStep === 'zonas-optimas-vino-2' ? 80 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'zonas-optimas-vino-2'
                      ? currentProgress <= 0.25
                        ? currentProgress * 10
                        : (1 - 0.5 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="p-2 mt-12 text-sm bg-white bg-opacity-70">
                    Aunque el vi??edo es una planta fuertemente adaptada a las condiciones
                    mediterr??neas y que necesita d??ficits h??dricos moderados para potenciar su
                    calidad, el aumento eventos clim??ticos extremos como olas de calor, per??odos de
                    sequ??a m??s extremos, descenso de la precipitaci??n pero cada vez m??s concentrada
                    en lluvias torrenciales tendr??a efectos negativos en calidad y rendimiento,
                    adem??s de aumentar la erosi??n de los suelos.
                  </div>
                </div>
              </div>
              <div
                className="absolute z-50 w-full p-4 pt-24 mt-4"
                style={{
                  zIndex: currentStep === 'cultivos-dehesa' ? 80 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'cultivos-dehesa'
                      ? currentProgress <= 0.25
                        ? currentProgress * 10
                        : (1 - 0.5 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-lg">Dehesa</div>
                  <div className="p-2 mt-12 text-sm bg-white bg-opacity-70">
                    <p>
                      La dehesa es un ejemplo ideal de gesti??n sostenible de un ecosistema
                      mediterr??neo con una <strong>extensi??n de 2.5 mHa</strong> particularmente
                      centradas en el suroeste de la pen??nsula donde conviven la actividad agr??cola,
                      ganadera, y forestal.
                    </p>
                    <p>
                      Dominada por pastos y con encinas, alcornoques, hayas, y pinos dispersos, la
                      dehesa constituye el medio para el desarrollo de explotaciones de cerdos,
                      ovejas, caballos y toros de gran valor a nivel nacional.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute z-50 w-full p-4 pt-24 mt-4"
                style={{
                  zIndex: currentStep === 'sequias-dehesa' ? 80 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'sequias-dehesa'
                      ? currentProgress <= 0.25
                        ? currentProgress * 10
                        : (1 - 0.5 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-lg">
                    Duraci??n de las sequ??as a lo largo del a??o en zonas de dehesa
                  </div>
                  <div className="p-2 mt-12 text-sm bg-white bg-opacity-70">
                    <p>
                      Extremadura concentra gran parte de la dehesa espa??ola, con 1.2 mHa que van a
                      estar expuestas (como otros ecosistemas mediterr??neos) al calentamiento y las
                      sequ??as que ser??n consecuencia del cambio clim??tico.
                    </p>
                    <p>
                      El aumento de la temperatura o la reducci??n de las precipitaciones podr??a
                      derivar por una parte en una menor producci??n vegetal, y por otra parte en el
                      agostamiento de la vegetaci??n herb??cea. Como consecuencia, esto podr??a reducir
                      la capacidad de carga animal por unidad de superficie y un posible d??ficit en
                      la calidad de la dieta animal ??? menor digestibilidad, menor contenido en
                      prote??nas.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute z-50 w-full p-4 pt-24 mt-4"
                style={{
                  zIndex: currentStep === 'incendios-dehesa' ? 80 : 1,
                  top: -(currentProgress * 10),
                  opacity:
                    currentStep === 'incendios-dehesa'
                      ? currentProgress <= 0.25
                        ? currentProgress * 10
                        : (1 - 0.5 - currentProgress) * 10
                      : '0',
                }}
              >
                <div>
                  <div className="font-serif text-lg">Riesgo de incendios en zonas de dehesa</div>
                  <div className="p-2 mt-12 text-sm bg-white bg-opacity-70">
                    <p>
                      La p??rdida de biodiversidad vegetal causada por la aridez se podr??a ver
                      empeorada por un mayor riesgo de incendios, que favorecer??a el crecimiento de
                      especies pir??fitas y menos nutritivas para el ganado y especies de inter??s
                      cineg??tico.
                    </p>
                    <p>
                      Aunque el volumen de producci??n en dehesas no es comparable al de zonas de
                      agricultura intensiva, la calidad de los productos y el impacto econ??mico
                      sobre la poblaci??n local son significativos y reconocidos. Prevenir las
                      consecuencias del cambio clim??tico no solo proteger?? la explotaci??n sostenible
                      de las dehesas y sus beneficios sociales, sino tambi??n el ecosistema natural.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SCROLLAMA */}
          <Scrollama onStepEnter={onStepEnter} progress onStepProgress={onStepProgress} offset={0}>
            <Step data={{ layerId: 'cultivos', stepId: 'cultivos', area: 'spain' }}>
              <div className="relative w-2/5 p-16 pt-40 opacity-0" style={{ marginTop: '-100vh' }}>
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">Superficie destinada a los cultivos</div>
                    <div className="mt-12 text-lg">
                      El dise??o e implementaci??n de estrategias de prevenci??n debe responder a la
                      diversidad de ambientes y condiciones clim??ticas en las que prosperan nuestros
                      cultivos (y sus distintas variedades), y tambi??n a la variabilidad geogr??fica
                      de las consecuencias del cambio clim??tico. A continuaci??n, exploramos los
                      efectos del cambio clim??tico en cuatro tipos de zonas agr??colas de inter??s:{' '}
                      <strong>olivares, vi??edos, cereales, y dehesas</strong>.
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'cultivos-olivar',
                stepId: 'cultivos-olivar-1',
                area: 'andalucia',
                cropSection: 'olivar',
              }}
            >
              <div className="relative w-2/5 p-16 pt-40 opacity-0" id="section-olivar">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">Olivar</div>
                    <div className="mt-12 text-lg">
                      <p>
                        Cultivado desde el tiempo de los fenicios y los romanos, la producci??n
                        ole??cola ha convertido a Espa??a en el principal productor y exportador
                        mundial de aceite de oliva.
                      </p>
                      <p>
                        <strong>
                          En Andaluc??a est?? concentrando un 60% del ??rea destinada a este cultivo
                          del pa??s.
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'cultivos-olivar',
                stepId: 'cultivos-olivar-2',
                area: 'andalucia',
                cropSection: 'olivar',
              }}
            >
              <div className="relative w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="mt-12 text-lg">
                      <p>
                        Sin embargo, <strong>Andaluc??a</strong> ???al igual que todo el sureste
                        peninsular??? tambi??n es una de las regiones que van a sufrir mayor{' '}
                        <strong>riesgo de aridificaci??n</strong> debido a la disminuci??n
                        generalizada de precipitaciones y el aumento de la duraci??n y severidad de
                        las sequ??as.
                      </p>
                      <p>
                        Estos cambios en la precipitaci??n afectar??n a{' '}
                        <strong>olivares tanto irrigados como de secano</strong>, disminuyendo su
                        rendimiento en al menos un 3.5% y 7% si se superan los 1,5 ??C en m??s de 11%
                        y 23% respectivamente a partir de los 3 ??C de calentamiento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'zonas-optimas-olivo',
                stepId: 'zonas-optimas-olivo',
                area: 'andalucia',
                cropSection: 'olivar',
              }}
            >
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">
                      Cambio en zonas ??ptimas para el cultivo de olivo
                    </div>
                    <div className="mt-12 text-lg">
                      Las alteraciones en la temporalidad y abundancia de la precipitaci??n van a
                      provocar{' '}
                      <strong>
                        cambios en las zonas geogr??ficas ??ptimas para el cultivo de la aceituna
                      </strong>{' '}
                      (aunque afectar?? de forma distinta a cada variedad). Las variedades locales
                      como el Lech??n, Manzanilla y Picudo ser??n las m??s afectadas viendo su zona
                      ??ptima de cultivo reducida en m??s de un 90% para 2050.
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'rendimiento-olivo',
                stepId: 'rendimiento-olivo',
                area: 'andalucia',
                cropSection: 'olivar',
              }}
            >
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">Proyecciones de rendimiento del olivo</div>
                    <div className="mt-12 text-lg">
                      <p>
                        Adem??s de estos cambios en la distribuci??n geogr??fica de las zonas ??ptimas
                        para cultivo, se podr??a esperar un{' '}
                        <strong>descenso de la producci??n de hasta el 20%</strong> en las
                        principales zonas productoras para los olivares de secano con un incremento
                        de la temperatura de 2,5??C.
                      </p>
                      <p>
                        <strong>
                          Aunque una gesti??n m??s eficiente de los recursos h??dricos ser?? necesaria
                          para abastecer los olivares, la implementaci??n de medidas urgentes que
                          reduzcan las emisiones de gases efecto invernadero y/o aumenten la
                          captaci??n de carbono atmosf??rico podr??an evitar impactos irreversibles
                          sobre estos cultivos.
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'cultivos-cereal',
                stepId: 'cultivos-cereal-1',
                area: 'castilla_leon',
                cropSection: 'cereal',
              }}
            >
              <div className="relative w-2/5 p-16 pt-40 opacity-0" id="section-cereal">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">Cereales</div>
                    <div className="mt-12 text-lg">
                      <p>
                        La producci??n de cereales es la m??s extendida de todos los cultivos en
                        Espa??a (6MHa). El 90% de la producci??n se destina a cereales de invierno,
                        trigo y cebada principalmente, casi en su totalidad (90%) de secano, y la
                        mayor??a se destina a piensos.
                      </p>
                      <p>
                        <strong>
                          En Castilla y Le??n, donde la superficie destinada al cultivo de cereales
                          es de aproximadamente 2MHa
                        </strong>
                        , se predice que las temperaturas podr??an aumentar entre 1,6 y 2??C en los
                        pr??ximos 30 a??os.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'rendimiento-cereal',
                stepId: 'rendimiento-cereal-1',
                area: 'castilla_leon',
                cropSection: 'cereal',
              }}
            >
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">
                      Proyecciones de rendimiento de cereales
                    </div>
                    <div className="mt-12 text-lg">
                      Se espera que el rendimiento del cultivo de cereales en el mundo{' '}
                      <strong>disminuya en un 5% por cada grado de aumento de temperatura</strong>.
                      En Espa??a, el aumento de la sequ??a ser??a la principal causa de la p??rdida de
                      rendimiento, que podr??a ser agravada por otras causas como incremento de los
                      da??os por pedrisco o plagas.
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'rendimiento-cereal',
                stepId: 'rendimiento-cereal-2',
                area: 'castilla_leon',
                cropSection: 'cereal',
              }}
            >
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="mt-12 text-lg">
                      Las condiciones derivadas del cambio clim??tico obligar??an a tomar medidas de
                      adaptaci??n al cultivo de cereales como cambios en las variedades de cultivos,
                      diferentes fechas de siembra y cosecha, cambios en el grado de mecanizaci??n o
                      diferentes tipos de nutrientes y fertilizantes. Por lo que se espera que el
                      Cambio Clim??tico aumente la vulnerabilidad del sector si no existe una
                      disminuci??n real de la emisi??n de gases de efecto invernadero
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'cultivos-vinedo',
                stepId: 'cultivos-vinedo',
                area: 'castilla_la_mancha',
                cropSection: 'vinedo',
              }}
            >
              <div className="relative w-2/5 p-16 pt-40 opacity-0" id="section-vinedo">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">Vi??edo</div>
                    <div className="mt-12 text-lg">
                      La calidad de las multiples variedades del vino espa??ol est?? reconocida
                      globalmente. Esta diversidad en variedades de uva y la calidad final del vino
                      responde a las distintas condiciones ambientales del territorio espa??ol:
                      suelos, reg??menes de precipitaci??n, variaciones t??rmicas diurnas y
                      estacionales, frecuencia e intensidad de heladas...
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'zonas-optimas-vino',
                stepId: 'zonas-optimas-vino-1',
                area: 'castilla_la_mancha',
                cropSection: 'vinedo',
              }}
            >
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">
                      Cambios en zonas ??ptimas para la producci??n de vino de calidad
                    </div>
                    <div className="mt-12 text-lg">
                      <p>
                        En Castilla la Mancha, las variedades que m??s se podr??an ver afectadas por
                        el cambio clim??tico son variedades m??s tempranas como tempranillo o
                        chardonnay, que ver??an reducida la superficie ??ptima para vinos de calidad
                        en un 50%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'zonas-optimas-vino',
                stepId: 'zonas-optimas-vino-2',
                area: 'castilla_la_mancha',
                cropSection: 'vinedo',
              }}
            >
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="mt-12 text-lg">
                      <p>
                        Aunque el vi??edo es una planta fuertemente adaptada a las condiciones
                        mediterr??neas y que necesita d??ficits h??dricos moderados para potenciar su
                        calidad, el aumento eventos clim??ticos extremos como olas de calor, per??odos
                        de sequ??a m??s extremos, descenso de la precipitaci??n pero cada vez m??s
                        concentrada en lluvias torrenciales tendr??a efectos negativos en calidad y
                        rendimiento, adem??s de aumentar la erosi??n de los suelos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'cultivos-dehesa',
                stepId: 'cultivos-dehesa',
                area: 'extremadura',
                cropSection: 'dehesa',
              }}
            >
              <div className="relative w-2/5 p-16 pt-40 opacity-0" id="section-dehesa">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">Dehesa</div>
                    <div className="mt-12 text-lg">
                      <p>
                        La dehesa es un ejemplo ideal de gesti??n sostenible de un ecosistema
                        mediterr??neo con una <strong>extensi??n de 2.5 mHa</strong> particularmente
                        centradas en el suroeste de la pen??nsula donde conviven la actividad
                        agr??cola, ganadera, y forestal.
                      </p>
                      <p>
                        Dominada por pastos y con encinas, alcornoques, hayas, y pinos dispersos, la
                        dehesa constituye el medio para el desarrollo de explotaciones de cerdos,
                        ovejas, caballos y toros de gran valor a nivel nacional.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'sequias-dehesa',
                stepId: 'sequias-dehesa',
                area: 'extremadura',
                cropSection: 'dehesa',
              }}
            >
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">
                      Duraci??n de las sequ??as a lo largo del a??o en zonas de dehesa.
                    </div>
                    <div className="mt-12 text-lg">
                      <p>
                        Extremadura concentra gran parte de la dehesa espa??ola, con 1.2 mHa que van
                        a estar expuestas (como otros ecosistemas mediterr??neos) al calentamiento y
                        las sequ??as que ser??n consecuencia del cambio clim??tico.
                      </p>
                      <p>
                        El aumento de la temperatura o la reducci??n de las precipitaciones podr??a
                        derivar por una parte en una menor producci??n vegetal, y por otra parte en
                        el agostamiento de la vegetaci??n herb??cea. Como consecuencia, esto podr??a
                        reducir la capacidad de carga animal por unidad de superficie y un posible
                        d??ficit en la calidad de la dieta animal ??? menor digestibilidad, menor
                        contenido en prote??nas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step
              data={{
                layerId: 'incendios-dehesa',
                stepId: 'incendios-dehesa',
                area: 'extremadura',
                cropSection: 'dehesa',
              }}
            >
              <div className="w-2/5 p-16 pt-40 opacity-0">
                <div className="top-0" style={{ height: MAP_SECTION_HEIGHT }}>
                  <div className="sticky top-40">
                    <div className="font-serif text-2xl">
                      Riesgo de incendios en zonas de dehesa
                    </div>
                    <div className="p-2 mt-12 text-sm bg-white bg-opacity-70">
                      <p>
                        La p??rdida de biodiversidad vegetal causada por la aridez se podr??a ver
                        empeorada por un mayor riesgo de incendios, que favorecer??a el crecimiento
                        de especies pir??fitas y menos nutritivas para el ganado y especies de
                        inter??s cineg??tico.
                      </p>
                      <p>
                        Aunque el volumen de producci??n en dehesas no es comparable al de zonas de
                        agricultura intensiva, la calidad de los productos y el impacto econ??mico
                        sobre la poblaci??n local son significativos y reconocidos. Prevenir las
                        consecuencias del cambio clim??tico no solo proteger?? la explotaci??n
                        sostenible de las dehesas y sus beneficios sociales, sino tambi??n el
                        ecosistema natural.
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

export default ElRiesgoAgricolaMap;

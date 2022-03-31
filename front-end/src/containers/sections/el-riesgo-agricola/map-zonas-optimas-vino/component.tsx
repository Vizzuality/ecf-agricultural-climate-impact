import { FC, useEffect, useCallback, useState } from 'react';

import Select from 'components/forms/select';
import MapSlider from 'components/map-slider';

import MapRisk from 'containers/map-risk';

import type { ElRiesgoClimaticoMapTypes } from './types';

import {
  YEARS_PROYECCIONES_VINO,
  SCENARIOS_PROYECCIONES_VINO,
  INDICATORS_PROYECCIONES_VINO,
} from './constants';

const INDICATORS = {
  'zonas-optimas-vino': INDICATORS_PROYECCIONES_VINO,
};

export const MapOptimalZonesWineMap: FC<ElRiesgoClimaticoMapTypes> = ({
  defaultActiveLayerId = 'zonas-optimas-vino',
  allowZoom = false,
}) => {
  const yearsProyeccionesWine = YEARS_PROYECCIONES_VINO.map((y) => {
    const splitValues = y.value.split('-');
    const label = Math.floor(
      parseInt(splitValues[0]) + (parseInt(splitValues[1]) - parseInt(splitValues[0])) / 2,
    );

    y.label = '' + label;

    return y;
  });

  const getIndicators = (layer) => {
    return INDICATORS[layer];
  };

  const [year, setYear] = useState(yearsProyeccionesWine[0]);
  const [scenario, setScenario] = useState({ value: 'baseline', label: '' });
  const [indicator, setIndicator] = useState(getIndicators(defaultActiveLayerId)?.[0]);
  const [indicators, setIndicators] = useState(getIndicators(defaultActiveLayerId));
  const [sliderValue, setSliderValue] = useState(0);

  const handleIndicatorChange = useCallback(
    (thisIndicator) => {
      setIndicator(indicators.find((c) => c.value === thisIndicator));
    },
    [indicators],
  );

  const handleYearSliderChange = (e) => {
    const currentYear = yearsProyeccionesWine[e];
    setYear(currentYear);
    setSliderValue(yearsProyeccionesWine.indexOf(currentYear));
    setScenario(
      currentYear.value === '2021-2050'
        ? SCENARIOS_PROYECCIONES_VINO[0]
        : {
            value: 'baseline',
            label: '0°C',
          },
    );
  };

  const handleScenarioSliderChange = (e) => {
    setScenario(SCENARIOS_PROYECCIONES_VINO[e]);
  };

  useEffect(() => {
    setIndicators(getIndicators('zonas-optimas-vino'));
    setIndicator(getIndicators('zonas-optimas-vino')?.[0]);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-lightest-grey">
      <div className="sticky top-0 left-0 z-20 w-full h-screen">
        <div className="w-2/5 ">
          <div className="relative ml-16 text-lg font-bold text-gray-400 top-32">En el mapa:</div>
          <div className="absolute bottom-0 z-20 w-2/5 p-16">
            <div className="inline-block w-1/2 pr-2">
              {year.value === '2021-2050' && (
                <MapSlider
                  values={SCENARIOS_PROYECCIONES_VINO}
                  value={scenario}
                  onChange={handleScenarioSliderChange}
                  disabled={!(year.value === '2021-2050')}
                />
              )}
            </div>
            <div className="inline-block w-1/2 pl-2">
              <MapSlider
                values={yearsProyeccionesWine}
                value={year}
                currentValue={sliderValue}
                onChange={handleYearSliderChange}
              />
            </div>
            <div>
              <div>
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
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-3/5 h-screen mapa-sequias">
          <MapRisk
            activeLayerId={defaultActiveLayerId}
            allowZoom={allowZoom}
            scenario={scenario}
            year={year}
            indicator={indicator}
            bounds="spain"
            legend="zonas-optimas-vino"
          />
        </div>
      </div>
      <div className="relative w-2/5 h-screen p-16 pt-40" style={{ marginTop: '-100vh' }}>
        <div className="top-0 h-screen">
          <div className="font-serif text-2xl">
            Cambios en zonas óptimas para la producción de vino de calidad
          </div>
          <div className="mt-12">
            En Castilla la Mancha, las variedades que más se podrían ver afectadas por el cambio
            climático son variedades más tempranas como tempranillo o chardonnay ; que
            particularmente se cultivan en el noreste de la comunidad. Además, los cambios en Aunque
            el viñedo es una planta fuertemente adaptada a las condiciones mediterráneas y que
            necesita déficits hídricos moderados para potenciar su calidad, el aumento eventos
            climáticos extremos como olas de calor, períodos de sequía más extremos, descenso de la
            precipitación pero cada vez más concentrada en lluvias torrenciales tendría efectos
            negativos en calidad y rendimiento, además de aumentar la erosión de los suelos.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapOptimalZonesWineMap;

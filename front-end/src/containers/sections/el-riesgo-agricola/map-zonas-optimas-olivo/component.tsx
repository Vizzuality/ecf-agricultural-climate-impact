import { FC, useState } from 'react';

import MapSlider from 'components/map-slider';

import MapRisk from 'containers/map-risk';

import type { ElRiesgoClimaticoMapTypes } from './types';

import { YEARS_PROYECCIONES_OLIVO, SCENARIOS_PROYECCIONES_OLIVO } from './constants';
export const MapOptimalZonesOliveMap: FC<ElRiesgoClimaticoMapTypes> = ({
  defaultActiveLayerId = 'zonas-optimas-olivo',
  allowZoom = false,
}) => {
  const yearsProyeccionesOlivo = YEARS_PROYECCIONES_OLIVO.map((y) => {
    const splitValues = y.value.split('_');
    const label = Math.floor(
      parseInt(splitValues[0]) + (parseInt(splitValues[1]) - parseInt(splitValues[0])) / 2,
    );

    y.label = '' + label;

    return y;
  });

  const [year, setYear] = useState(yearsProyeccionesOlivo[0]);
  const [scenario] = useState(SCENARIOS_PROYECCIONES_OLIVO[0]);
  const [sliderValue, setSliderValue] = useState(0);

  const handleYearSliderChange = (e) => {
    const currentYear = yearsProyeccionesOlivo[e];
    setYear(currentYear);
    setSliderValue(yearsProyeccionesOlivo.indexOf(currentYear));
  };

  return (
    <div className="relative w-full overflow-hidden bg-lightest-grey">
      <div className="sticky top-0 left-0 z-20 w-full h-screen">
        <div className="w-2/5 ">
          <div className="relative ml-16 text-lg font-bold text-gray-400 top-32">En el mapa:</div>
          <div className="absolute bottom-0 z-20 w-2/5 p-16">
            <div className="inline-block w-1/2 pr-2">
              <MapSlider
                values={SCENARIOS_PROYECCIONES_OLIVO}
                value={scenario}
                onChange={null}
                disabled={true}
              />
            </div>
            <div className="inline-block w-1/2 pl-2">
              <MapSlider
                values={yearsProyeccionesOlivo}
                value={year}
                currentValue={sliderValue}
                onChange={handleYearSliderChange}
              />
            </div>
          </div>
        </div>
        {/* <div className="absolute bottom-0 z-20 w-2/5 p-16"></div> */}
        <div className="absolute top-0 right-0 w-3/5 h-screen mapa-sequias">
          <MapRisk
            activeLayerId={defaultActiveLayerId}
            allowZoom={allowZoom}
            year={year}
            bounds="andalucia"
            legend="zonas-optimas-olivo"
          />
        </div>
      </div>
      <div className="relative w-2/5 h-screen p-16 pt-40" style={{ marginTop: '-100vh' }}>
        <div className="top-0 h-screen">
          <div className="font-serif text-2xl">
            Cambio en zonas óptimas para el cultivo de olivo
          </div>
          <div className="mt-12">
            Las alteraciones en la temporalidad y abundancia de la precipitación van a provocar
            <strong>
              cambios en las zonas geográficas óptimas para el cultivo de la aceituna
            </strong>{' '}
            (aunque afectará de forma distinta a cada variedad). Por ejemplo, la variedad Picual,
            que actualmente ocupa 1.867.700 Ha (o el 60% de todo el olivar andaluz) vería su zona
            óptima de cultivo reducida en un ##%, particularmente en las provincias de {'{'}
            provincias{'}'}.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapOptimalZonesOliveMap;

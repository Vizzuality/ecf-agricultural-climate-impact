import { FC, useState } from 'react';
import Button from 'components/button';
import MapSlider from 'components/map-slider';

import MapRisk from 'containers/map-risk';

import type { ElRiesgoClimaticoMapTypes } from './types';

import { SCENARIOS_RENDIMIENTO_OLIVO, YEARS_RENDIMIENTO_OLIVO } from './constants';

export const MapRendimientoOlivoMap: FC<ElRiesgoClimaticoMapTypes> = ({
  defaultActiveLayerId = 'rendimiento-olivo',
  allowZoom = false,
}) => {
  const [geoType, setGeoType] = useState('municipios');
  const [scenario, setScenario] = useState(SCENARIOS_RENDIMIENTO_OLIVO[0]);
  const [year] = useState(YEARS_RENDIMIENTO_OLIVO[0]);

  const handleGeoTypeChange = (type) => {
    setGeoType(type);
  };

  const handleScenarioSliderChange = (e) => {
    setScenario(SCENARIOS_RENDIMIENTO_OLIVO[e]);
  };

  return (
    <div className="relative w-full overflow-hidden bg-lightest-grey">
      <div className="sticky top-0 left-0 z-20 w-full h-screen">
        <div className="w-2/5 ">
          <div className="relative ml-16 text-lg font-bold text-gray-400 top-32">En el mapa:</div>
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
        </div>
        <div className="absolute bottom-0 z-20 w-2/5 p-16">
          <div className="inline-block w-1/2 pr-2">
            <MapSlider
              values={SCENARIOS_RENDIMIENTO_OLIVO}
              value={scenario}
              onChange={handleScenarioSliderChange}
            />
          </div>
          <div className="inline-block w-1/2 pl-2">
            <MapSlider
              values={YEARS_RENDIMIENTO_OLIVO}
              value={year}
              onChange={null}
              disabled={true}
            />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-3/5 h-screen mapa-sequias">
          <MapRisk
            activeLayerId={defaultActiveLayerId}
            allowZoom={allowZoom}
            geoType={geoType}
            scenario={scenario}
            year={YEARS_RENDIMIENTO_OLIVO[0]}
            legend="rendimiento-olivo"
          />
        </div>
      </div>
      <div className="relative w-2/5 h-screen p-16 pt-40" style={{ marginTop: '-100vh' }}>
        <div className="top-0 h-screen">
          <div className="font-serif text-2xl">Proyecciones de rendimiento del olivo</div>
          <div className="mt-12">
            <p>
              Además de estos cambios en la distribución geográfica de las zonas óptimas para
              cultivo, se podría esperar un{' '}
              <strong>descenso de la producción de hasta el 20%</strong> en la Península Ibérica
              para los olivares de secano con un incremento de la temperatura de 2,5ºC.
            </p>
            <p>
              <strong>
                Aunque una gestión más eficiente de los recursos hídricos será necesaria para
                abastecer los olivares, la implementación de medidas urgentes que reduzcan las
                emisiones de gases efecto invernadero y/o aumenten la captación de carbono
                atmosférico podrían evitar impactos irreversibles sobre estos cultivos.
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapRendimientoOlivoMap;

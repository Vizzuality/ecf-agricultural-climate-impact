import { FC, useState } from 'react';
import Button from 'components/button';
import MapSlider from 'components/map-slider';

import MapRisk from 'containers/map-risk';

import type { ElRiesgoClimaticoMapTypes } from './types';

import { SCENARIOS } from './constants';

export const MapRendimientoOlivoMap: FC<ElRiesgoClimaticoMapTypes> = ({
  defaultActiveLayerId = 'rendimiento-olivo',
  allowZoom = false,
}) => {
  const [geoType, setGeoType] = useState('municipios');
  const [scenario, setScenario] = useState(SCENARIOS[0]);

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
            <MapSlider values={SCENARIOS} value={scenario} onChange={handleScenarioSliderChange} />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-3/5 h-screen mapa-sequias">
          <MapRisk
            activeLayerId={defaultActiveLayerId}
            allowZoom={allowZoom}
            geoType={geoType}
            scenario={scenario}
            year={{ value: '2041–2070', label: '' }}
          />
        </div>
      </div>
      <div className="relative w-2/5 h-screen p-16 pt-40" style={{ marginTop: '-100vh' }}>
        <div className="top-0 h-screen">
          <div className="font-serif text-2xl">Superficie destinada a los cultivos</div>
          <div className="mt-12">
            El diseño e implementación de estrategias de prevención debe responder a la diversidad
            de ambientes y condiciones climáticas en las que prosperan nuestros cultivos (y sus
            distintas variedades), y también a la variabilidad geográfica de las consecuencias del
            cambio climático. A continuación, exploramos los efectos del cambio climático en cuatro
            tipos de zonas agrícolas de interés:{' '}
            <strong>olivares, viñedos, cereales, y dehesas</strong>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapRendimientoOlivoMap;

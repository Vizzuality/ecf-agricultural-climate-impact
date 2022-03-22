import { FC } from 'react';

import MapRisk from 'containers/map-risk';

import type { ElRiesgoClimaticoMapTypes } from './types';

export const MapCropsMap: FC<ElRiesgoClimaticoMapTypes> = ({
  defaultActiveLayerId = 'crops',
  allowZoom = false,
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-lightest-grey">
      <div className="sticky top-0 left-0 z-20 w-full h-screen">
        <div className="w-2/5 ">
          <div className="relative ml-16 text-lg font-bold text-gray-400 top-32">En el mapa:</div>
        </div>
        <div className="absolute bottom-0 z-20 w-2/5 p-16"></div>
        <div className="absolute top-0 right-0 w-3/5 h-screen mapa-sequias">
          <MapRisk activeLayerId={defaultActiveLayerId} allowZoom={allowZoom} />
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

export default MapCropsMap;

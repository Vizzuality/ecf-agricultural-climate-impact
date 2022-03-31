import { FC, useState, useCallback } from 'react';
import Select from 'components/forms/select';
import MapSlider from 'components/map-slider';

import MapRisk from 'containers/map-risk';

import type { ElRiesgoClimaticoMapTypes } from './types';

import {
  SCENARIOS_RENDIMIENTO_CEREALES,
  CROPS_RENDIMIENTO_CEREALES,
  YEARS_RENDIMIENTO_CEREALES,
} from './constants';

export const MapRendimientoCerealesMap: FC<ElRiesgoClimaticoMapTypes> = ({
  defaultActiveLayerId = 'rendimiento-cereales',
  allowZoom = false,
}) => {
  const [crop, setCrop] = useState(CROPS_RENDIMIENTO_CEREALES[0]);
  const [scenario, setScenario] = useState(SCENARIOS_RENDIMIENTO_CEREALES[0]);
  const [year] = useState(YEARS_RENDIMIENTO_CEREALES[0]);

  const handleCropChange = useCallback((thisCrop) => {
    setCrop(CROPS_RENDIMIENTO_CEREALES.find((c) => c.value === thisCrop));
  }, []);

  const handleScenarioSliderChange = (e) => {
    setScenario(SCENARIOS_RENDIMIENTO_CEREALES[e]);
  };

  return (
    <div className="relative w-full overflow-hidden bg-lightest-grey">
      <div className="sticky top-0 left-0 z-20 w-full h-screen">
        <div className="w-2/5 ">
          <div className="relative ml-16 text-lg font-bold text-gray-400 top-32">En el mapa:</div>
        </div>
        <div className="absolute bottom-0 z-20 w-2/5 p-16">
          <div className="flex flex-col">
            <div className="mb-4">
              <div className="inline-block w-1/2 pr-2">
                <MapSlider
                  values={SCENARIOS_RENDIMIENTO_CEREALES}
                  value={scenario}
                  onChange={handleScenarioSliderChange}
                />
              </div>
              <div className="inline-block w-1/2 pl-2">
                <MapSlider
                  values={YEARS_RENDIMIENTO_CEREALES}
                  value={year}
                  onChange={null}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <div>
                <Select
                  id="crops-selection"
                  initialSelected={CROPS_RENDIMIENTO_CEREALES[0].value}
                  onChange={handleCropChange}
                  options={CROPS_RENDIMIENTO_CEREALES}
                  placeholder="Elige el cultivo"
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
            // geoType={geoType}
            scenario={scenario}
            // year={{ value: '2041–2070', label: '' }}
            legend="rendimiento-cereal"
            crop={crop}
          />
        </div>
      </div>
      <div className="relative w-2/5 h-screen p-16 pt-40" style={{ marginTop: '-100vh' }}>
        <div className="top-0 h-screen">
          <div className="font-serif text-2xl">Proyecciones de rendimiento de cereales</div>
          <div className="mt-12">
            Se espera que el rendimiento del cultivo de trigo{' '}
            <strong>disminuya en un 5% por cada grado de aumento de temperatura</strong>. Esta
            pérdida de rendimiento en cultivos de cereales de invierno como el trigo podría ser
            agravada por la reducción en precipitación y la severidad de la sequía primaveral.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapRendimientoCerealesMap;

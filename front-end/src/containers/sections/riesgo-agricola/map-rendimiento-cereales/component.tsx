import { FC, useState, useCallback } from 'react';
import Select from 'components/forms/select';
import MapSlider from 'components/map-slider';

import MapRisk from 'containers/map-risk';

import type { ElRiesgoClimaticoMapTypes } from './types';

import { SCENARIOS, CROPS } from './constants';

export const MapRendimientoCerealesMap: FC<ElRiesgoClimaticoMapTypes> = ({
  defaultActiveLayerId = 'rendimiento-olivo',
  allowZoom = false,
}) => {
  const [crop, setCrop] = useState(CROPS[0]);
  const [scenario, setScenario] = useState(SCENARIOS[0]);

  const handleCropChange = useCallback((thisCrop) => {
    setCrop(CROPS.find((c) => c.value === thisCrop));
  }, []);

  const handleScenarioSliderChange = (e) => {
    setScenario(SCENARIOS[e]);
  };

  return (
    <div className="relative w-full overflow-hidden bg-lightest-grey">
      <div className="sticky top-0 left-0 z-20 w-full h-screen">
        <div className="w-2/5 ">
          <div className="relative ml-16 text-lg font-bold text-gray-400 top-32">En el mapa:</div>
        </div>
        <div className="absolute bottom-0 z-20 w-2/5 p-16">
          <div className="flex flex-col">
            <div className="inline-block w-1/2 pr-2">
              <MapSlider
                values={SCENARIOS}
                value={scenario}
                onChange={handleScenarioSliderChange}
              />
            </div>
            <div>
              <Select
                id="crops-selection"
                initialSelected={CROPS[0].value}
                // maxHeight={300}
                onChange={handleCropChange}
                // onSelect={function noRefCheck() {}}
                options={CROPS}
                placeholder="Elige el cultivo"
                // prefix="FILTER BY:"
                size="base"
                // status="none"
                theme="light"
              />
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

export default MapRendimientoCerealesMap;

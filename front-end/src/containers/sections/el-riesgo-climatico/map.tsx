import { useEffect, useState, FC } from 'react';
// import { Listbox } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/solid';

import Button from 'components/button';
import MapSlider from 'components/map-slider';

import MapVisualization from 'containers/map-visualization';

// constants
import { SCENARIOS, YEARS_CALENTAMIENTO, YEARS_SEQUIAS } from './constants';

// const municipalities = [
//   { id: 28079, name: 'Madrid' },
//   { id: 8019, name: 'Barcelona' },
// ];

export const ElRiesgoClimaticoMap: FC = ({ defaultActiveLayerId }) => {
  const yearsCalentamiento = YEARS_CALENTAMIENTO.map((y) => {
    const splitValues = y.value.split(' - ');
    const label = Math.floor(
      parseInt(splitValues[0]) + (parseInt(splitValues[1]) - parseInt(splitValues[0])) / 2,
    );

    y.label = '' + label;

    return y;
  });

  const yearsSequias = YEARS_SEQUIAS.map((y) => {
    const splitValues = y.value.split(' - ');
    const label = Math.floor(
      parseInt(splitValues[0]) + (parseInt(splitValues[1]) - parseInt(splitValues[0])) / 2,
    );

    y.label = '' + label;

    return y;
  });

  const [activeLayerId, setActiveLayerId] = useState(defaultActiveLayerId || 'calentamiento');
  const [geoType, setGeoType] = useState('municipios');
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [year, setYear] = useState(yearsCalentamiento[0]);
  // const [municipality, setMunicipality] = useState(municipalities[0]);
  const [sliderValue, setSliderValue] = useState(0);

  const handleDatasetChange = (dataset) => {
    setActiveLayerId(dataset);
  };

  const handleGeoTypeChange = (type) => {
    setGeoType(type);
  };

  const handleScenarioSliderChange = (e) => {
    setScenario(SCENARIOS[e]);
  };

  const handleYearSliderChange = (e) => {
    const currentYear = activeLayerId === 'calentamiento' ? yearsCalentamiento[e] : yearsSequias[e];
    setYear(currentYear);
    setSliderValue(
      activeLayerId === 'calentamiento'
        ? yearsCalentamiento.indexOf(currentYear)
        : yearsSequias.indexOf(currentYear),
    );
  };

  // const handleMunicipalitiesChange = (e) => {
  //   setMunicipality(e);
  // };

  useEffect(() => {
    setSliderValue(0);
    setYear(activeLayerId === 'calentamiento' ? yearsCalentamiento[0] : yearsSequias[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLayerId]);

  return (
    <div className="flex w-full h-full bg-lightest-grey">
      <div className="flex flex-col w-2/5 h-full p-4">
        <div className="flex-1">
          <div className="text-lg font-bold text-gray-400">En el mapa:</div>
          <div className="font-serif text-2xl">Proyecciones de calentamiento</div>
          <div className="mt-16">
            Asociado al calentamiento, la Península Ibérica se verá afectada por la{' '}
            <strong>aridificación</strong>.
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            theme="primary"
            size="base"
            className="flex-shrink-0 sm:mr-5"
            onClick={() => handleDatasetChange('calentamiento')}
          >
            calentamiento
          </Button>
          <Button
            theme="primary"
            size="base"
            className="flex-shrink-0 sm:mr-5"
            onClick={() => handleDatasetChange('sequias')}
          >
            sequías
          </Button>
        </div>
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
        <div className="mt-4">
          <div className="inline-block w-1/2 pr-2">
            <MapSlider values={SCENARIOS} value={scenario} onChange={handleScenarioSliderChange} />
          </div>
          <div className="inline-block w-1/2 pl-2">
            <MapSlider
              values={activeLayerId === 'calentamiento' ? yearsCalentamiento : yearsSequias}
              value={year}
              currentValue={sliderValue}
              onChange={handleYearSliderChange}
            />
          </div>
        </div>
        {/* TODO: Select municipalities */}
        {/* <div className="p-4">
                    <Listbox value={municipality} onChange={handleMunicipalitiesChange}>
                      <Listbox.Button className="relative w-full px-2 py-1 text-left bg-white border border-black">
                        <span className="block truncate">{municipality?.name}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <ChevronDownIcon className="w-5 h-5 text-black" aria-hidden="true" />
                        </span>
                      </Listbox.Button>
                      <Listbox.Options>
                        {municipalities?.map((municipality) => (
                          <Listbox.Option key={municipality.id} value={municipality}>
                            {municipality.name}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Listbox>
                  </div> */}
      </div>
      <div className="w-3/5 h-full">
        <MapVisualization
          activeLayerId={activeLayerId}
          geoType={geoType}
          // municipality={municipality}
          scenario={scenario}
          year={year}
        />
      </div>
    </div>
  );
};

export default ElRiesgoClimaticoMap;

import { FC, useState, useEffect, useRef } from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
import ReactSlider from 'react-slider';
// import cx from 'classnames';

// utils
import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';
import Button from 'components/button';

// constants
import { TITLE, SCENARIOS, YEARS } from './constants';

import ChartEmisionesCo2 from 'containers/charts/emisiones-co2';
import MapVisualization from 'containers/map-visualization';

const municipalities = [
  { id: 28079, name: 'Madrid' },
  { id: 8019, name: 'Barcelona' },
];

export const ElRiesgoClimatico: FC = (props) => {
  const [geoType, setGeoType] = useState('municipios');
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [year, setYear] = useState(YEARS[0]);
  const [municipality, setMunicipality] = useState(municipalities[0]);

  const handleGeoTypeChange = (type) => {
    setGeoType(type);
  };

  const handleScenarioSliderChange = (e) => {
    setScenario(SCENARIOS[e]);
  };

  const handleYearSliderChange = (e) => {
    setYear(YEARS[e]);
  };

  const handleMunicipalitiesChange = (e) => {
    setMunicipality(e);
  };

  return (
    <section className="relative">
      <MediaContextProvider>
        <Desktop includeBiggerScreens>
          <div className="w-full bg-primary-red">
            <div className="flex flex-col items-start w-full max-w-screen-lg pt-32 mx-auto bg-primary-red">
              <h1 className="relative px-3 py-2 font-serif text-6xl transition-opacity duration-500 text-primary-red">
                <span className="relative z-10">{TITLE}</span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1 }}
                  className="absolute top-0 left-0 z-0 h-full bg-white"
                />
              </h1>
              <div className="py-16 text-white" style={{ columns: '2' }}>
                <p>
                  El aumento de las emisiones de gases de efecto invernadero a nivel global está
                  provocando cambios en los patrones de temperatura, precipitaciones, y la
                  frecuencia frecuencia e intensidad de fenómenos extremos.
                </p>
                <p>
                  También desde España,{' '}
                  <strong>las emisiones de estos gases se multiplicaron por #</strong> desde
                  principios del siglo XX, causadas por el sector energético, industrial,
                  transporte, y agrícola.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start w-full max-w-screen-xl pb-32 mx-auto">
              <div className="w-full">
                <ChartEmisionesCo2 />
              </div>
            </div>
            <div className="flex w-full h-screen pt-16">
              <div className="flex w-full h-full bg-lightest-grey">
                <div className="flex flex-col w-2/5 h-full">
                  <div className="flex-1 p-4">
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
                    <div className="inline-block w-1/2 px-4">
                      <ReactSlider
                        className="h-px my-4 bg-black"
                        min={0}
                        max={SCENARIOS.length - 1}
                        thumbClassName="w-10 h-10 flex items-center justify-center rounded-full -top-4 outline-none bg-white border border-black text-sm"
                        onChange={handleScenarioSliderChange}
                        renderThumb={(props) => <div {...props}>{scenario.label}</div>}
                      />
                    </div>
                    <div className="inline-block w-1/2 px-4">
                      <ReactSlider
                        className="h-px my-4 bg-black"
                        min={0}
                        max={YEARS.length - 1}
                        thumbClassName="w-10 h-10 flex items-center justify-center rounded-full -top-4 outline-none bg-white border border-black text-sm"
                        onChange={handleYearSliderChange}
                        renderThumb={(props) => <div {...props}>{year.label}</div>}
                      />
                    </div>
                  </div>
                  <div className="p-4">
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
                  </div>
                </div>
                <div className="w-3/5 h-full">
                  <MapVisualization
                    activeLayerId="calentamiento"
                    geoType={geoType}
                    municipality={municipality}
                    scenario={scenario}
                    year={year}
                  />
                </div>
              </div>
            </div>
          </div>
        </Desktop>
        <Mobile>
          <div>Mobile</div>
        </Mobile>
      </MediaContextProvider>
    </section>
  );
};

export default ElRiesgoClimatico;

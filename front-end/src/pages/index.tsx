import { useState, useEffect } from 'react';
// import queryString from 'query-string';

// containers
import Section from 'containers/section';
import Hero from 'containers/sections/hero';
// import Headline from 'containers/headline';
// import MapVisualization from 'containers/map-visualization';
import CultivoCulturaCambio from 'containers/sections/cultivo-cultura-cambio';
import ElRiesgoClimatico from 'containers/sections/el-riesgo-climatico';
import AllMaps from 'containers/all-maps';
// import DesafioGlobalHeadline from 'containers/sections/desafio-global/headline';
// import DesafioGlobalNarrative from 'containers/sections/desafio-global/narrative';
// import EconomiaEnRiesgoHeadline from 'containers/sections/economia-en-riesgo/headline';
// import EfectosSobreCultivosHeadline from 'containers/sections/efectos-sobre-cultivos/headline';
// import ConclusionesHeadline from 'containers/sections/conclusiones/headline';
import Menu from 'containers/menu';
import { SectionIDs } from 'types';

const Welcome: React.FC = () => {
  const [isMaps, setIsMaps] = useState(false);
  // const [activeLayerId, setActiveLayerId] = useState();
  // const query = location.search;
  useEffect(() => {
    setIsMaps(location.search.indexOf('mapas') >= 0);
  }, []);

  return (
    <div>
      {!isMaps && (
        <div>
          <Menu />
          {/* <Headline /> */}
          <Hero />
          <Section id={SectionIDs.CultivoCulturaCambio} title="Cultivo, cultura, cambio">
            <CultivoCulturaCambio />
          </Section>
          <Section id={SectionIDs.ElRiesgoClimatico} title="El Riesgo Climático">
            <ElRiesgoClimatico />
          </Section>
          {/* <Section id={SectionIDs.EconomiaRiesgo} title="Section 2">
            <EconomiaEnRiesgoHeadline />
          </Section>
          <Section id={SectionIDs.EfectosCultivos} title="Section 3">
            <EfectosSobreCultivosHeadline />
          </Section>
          <Section id={SectionIDs.Conclusiones} title="Section 4">
            <ConclusionesHeadline />
          </Section> */}
        </div>
      )}
      {isMaps && <AllMaps />}
    </div>
  );
};

export default Welcome;

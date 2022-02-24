// import { useState } from 'react';

// containers
import Section from 'containers/section';
import Headline from 'containers/headline';
import MapVisualization from 'containers/map-visualization';
import DesafioGlobalHeadline from 'containers/sections/desafio-global/headline';
import DesafioGlobalNarrative from 'containers/sections/desafio-global/narrative';
import EconomiaEnRiesgoHeadline from 'containers/sections/economia-en-riesgo/headline';
import EfectosSobreCultivosHeadline from 'containers/sections/efectos-sobre-cultivos/headline';
import ConclusionesHeadline from 'containers/sections/conclusiones/headline';
import Menu from 'containers/menu';
import { SectionIDs } from 'types';

const Welcome: React.FC = () => {
  // const [activeLayerId, setActiveLayerId] = useState();

  return (
    <div>
      <Headline />
      <Menu />
      <Section id={SectionIDs.DesafioGlobal} title="Section 1">
        <div className="h-screen">
          <MapVisualization activeLayerId="protected-areas" />
        </div>
        <DesafioGlobalHeadline />
        <DesafioGlobalNarrative />
      </Section>
      <Section id={SectionIDs.EconomiaRiesgo} title="Section 2">
        <EconomiaEnRiesgoHeadline />
      </Section>
      <Section id={SectionIDs.EfectosCultivos} title="Section 3">
        <EfectosSobreCultivosHeadline />
      </Section>
      <Section id={SectionIDs.Conclusiones} title="Section 4">
        <ConclusionesHeadline />
      </Section>
    </div>
  );
};

export default Welcome;

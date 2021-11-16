import { useState } from 'react';

// containers
import Section from 'containers/section';
import Headline from 'containers/headline';
import MapVisualization from 'containers/map-visualization';
import DesafioGlobalHeadline from 'containers/sections/desafio-global/headline';
import EconomiaEnRiesgoHeadline from 'containers/sections/economia-en-riesgo/headline';
import EfectosSobreCultivosHeadline from 'containers/sections/efectos-sobre-cultivos/headline';

const Welcome: React.FC = () => {
  // const [activeLayerId, setActiveLayerId] = useState();

  return (
    <div>
      <Headline />
      <Section id="section-1" title="Section 1">
        {/* <MapVisualization activeLayerId="mosaic-land-cover-and-land-use-2000" /> */}
        <DesafioGlobalHeadline />
      </Section>
      <Section id="section-2" title="Section 2">
        <EconomiaEnRiesgoHeadline />
      </Section>
      <Section id="section-3" title="Section 3">
        <EfectosSobreCultivosHeadline />
      </Section>
      <Section id="section-4" title="Section 4">
      </Section>
    </div>
  );
};

export default Welcome;

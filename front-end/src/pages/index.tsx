import { useState } from 'react';
// import MapVisualization from 'containers/map-visualization';

import Section from 'containers/section';
import Headline from 'containers/headline';
import MapVisualization from 'containers/map-visualization';

const Welcome: React.FC = () => {
  // const [activeLayerId, setActiveLayerId] = useState();

  return (
    <div>
      <Headline />
      <Section id="section-1" title="Section 1">
        <MapVisualization activeLayerId="mosaic-land-cover-and-land-use-2000" />
      </Section>
      <Section id="section-2" title="Section 2">
        blablablabla 2
      </Section>
      <Section id="section-3" title="Section 3">
        blablablabla 3
      </Section>
      <Section id="section-4" title="Section 4">
        blablablabla 4
      </Section>
      {/* <MapVisualization activeLayer={activeLayerId} bounds={[]} /> */}
    </div>
  );
};

export default Welcome;

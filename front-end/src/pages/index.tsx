import { useState } from 'react';
// import MapVisualization from 'containers/map-visualization';

import Section from 'containers/section';

const Welcome: React.FC = () => {
  // const [activeLayerId, setActiveLayerId] = useState();

  return (
    <div>
      <h1>Welcome to Agricultural ECF</h1>
      <Section id="section-1" title="Section 1">
        blablablabla 1
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

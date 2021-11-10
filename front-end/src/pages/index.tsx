import { useState } from 'react';
import MapVisualization from 'containers/map-visualization';

const Welcome: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState();

  return (
    <div>
      <h1>Welcome</h1>
      <section>
        <article>
          <h1>Section 1</h1>
          <p>lorem ipsum</p>
        </article>
      </section>
      <MapVisualization activeLayer={activeLayerId} bounds={[]} />
    </div>
  );
};

export default Welcome;

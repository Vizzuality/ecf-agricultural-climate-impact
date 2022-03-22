import MapOptimalZonesMap from 'containers/sections/riesgo-agricola/map-zonas-optimas';

const Sequias: React.FC = () => (
  <div>
    <MapOptimalZonesMap defaultActiveLayerId={'optimal_zones'} allowZoom={true} />
  </div>
);

export default Sequias;

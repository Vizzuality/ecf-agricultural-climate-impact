import MapOptimalZonesOliveMap from 'containers/sections/riesgo-agricola/map-zonas-optimas-olivo';

const OptimalZonesOlive: React.FC = () => (
  <div>
    <MapOptimalZonesOliveMap defaultActiveLayerId={'optimal_zones'} allowZoom={true} />
  </div>
);

export default OptimalZonesOlive;

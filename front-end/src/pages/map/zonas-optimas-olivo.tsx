import MapOptimalZonesOliveMap from 'containers/sections/riesgo-agricola/map-zonas-optimas-olivo';

const OptimalZonesOlive: React.FC = () => (
  <div>
    <MapOptimalZonesOliveMap defaultActiveLayerId={'zonas-optimas-olivo'} allowZoom={true} />
  </div>
);

export default OptimalZonesOlive;

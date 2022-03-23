import MapOptimalZonesWineMap from 'containers/sections/riesgo-agricola/map-zonas-optimas-vino';

const OptimalZonesWine: React.FC = () => (
  <div>
    <MapOptimalZonesWineMap defaultActiveLayerId={'zonas-optimas-vino'} allowZoom={true} />
  </div>
);

export default OptimalZonesWine;

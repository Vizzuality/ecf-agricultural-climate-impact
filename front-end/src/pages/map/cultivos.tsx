import MapCropsMap from 'containers/sections/riesgo-agricola/map-cultivos';

const Cultivos: React.FC = () => (
  <div>
    <MapCropsMap defaultActiveLayerId={'crops'} allowZoom={true} />
  </div>
);

export default Cultivos;

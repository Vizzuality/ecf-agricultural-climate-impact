import MapCropsMap from 'containers/sections/agricultural-risk/map-crops';

const Crops: React.FC = () => (
  <div>
    <MapCropsMap defaultActiveLayerId={'crops'} allowZoom={true} />
  </div>
);

export default Crops;

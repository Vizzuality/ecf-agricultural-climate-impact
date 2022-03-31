import MapRendimientoCerealesMap from 'containers/sections/el-riesgo-agricola/map-rendimiento-cereales';

const RendimientoCereales: React.FC = () => (
  <div>
    <MapRendimientoCerealesMap defaultActiveLayerId={'rendimiento-cereal'} allowZoom={true} />
  </div>
);

export default RendimientoCereales;

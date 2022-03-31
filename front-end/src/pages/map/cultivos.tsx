import MapCultivosMap from 'containers/sections/el-riesgo-agricola/map-cultivos';

const Cultivos: React.FC = () => (
  <div>
    <MapCultivosMap defaultActiveLayerId={'cultivos'} allowZoom={true} />
  </div>
);

export default Cultivos;

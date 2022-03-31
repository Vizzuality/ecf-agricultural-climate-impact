import MapRendimientoOlivoMap from 'containers/sections/el-riesgo-agricola/map-rendimiento-olivo';

const Cultivos: React.FC = () => (
  <div>
    <MapRendimientoOlivoMap defaultActiveLayerId={'rendimiento-olivo'} allowZoom={true} />
  </div>
);

export default Cultivos;

import MapIncendiosDehesaMap from 'containers/sections/el-riesgo-agricola/map-aridez';

const IncendiosDehesa: React.FC = () => (
  <div>
    <MapIncendiosDehesaMap defaultActiveLayerId={'aridez'} allowZoom={true} />
  </div>
);

export default IncendiosDehesa;

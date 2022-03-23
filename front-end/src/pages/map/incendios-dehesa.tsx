import MapIncendiosDehesaMap from 'containers/sections/riesgo-agricola/map-incendios-dehesa';

const IncendiosDehesa: React.FC = () => (
  <div>
    <MapIncendiosDehesaMap defaultActiveLayerId={'incendios-dehesa'} allowZoom={true} />
  </div>
);

export default IncendiosDehesa;

import MapSequiasDehesaMap from 'containers/sections/riesgo-agricola/map-sequias-dehesa';

const SequiasDehesa: React.FC = () => (
  <div>
    <MapSequiasDehesaMap defaultActiveLayerId={'sequias-dehesa'} allowZoom={true} />
  </div>
);

export default SequiasDehesa;

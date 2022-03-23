import MapPrecipitacionMap from 'containers/sections/riesgo-agricola/map-precipitacion';

const Precipitacion: React.FC = () => (
  <div>
    <MapPrecipitacionMap defaultActiveLayerId={'precipitacion'} allowZoom={true} />
  </div>
);

export default Precipitacion;

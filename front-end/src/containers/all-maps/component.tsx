import { FC } from 'react';

import ElRiesgoClimaticoMap from 'containers/sections/el-riesgo-climatico/map';

const AllMaps: FC = () => {
  return (
    <div>
      <div className="flex h-screen">
        <ElRiesgoClimaticoMap defaultActiveLayerId="calentamiento" />
      </div>
      <div className="flex h-screen">
        <ElRiesgoClimaticoMap defaultActiveLayerId="sequias" />
      </div>
    </div>
  );
};

export default AllMaps;

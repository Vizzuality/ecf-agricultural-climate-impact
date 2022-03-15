import { FC, useCallback, useMemo, useEffect, useState, useRef } from 'react';

import Button from 'components/button';
import MapSlider from 'components/map-slider';
import MapVisualization from 'containers/map-visualization';

import ElRiesgoClimatico from 'containers/sections/el-riesgo-climatico';
import ElRiesgoClimaticoMap from 'containers/sections/el-riesgo-climatico/map';

import {
  TITLE,
  SCENARIOS,
  YEARS_CALENTAMIENTO,
  YEARS_SEQUIAS,
} from 'containers/sections/el-riesgo-climatico/constants';

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

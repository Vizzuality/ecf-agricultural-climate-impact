import { FC, useState, useEffect, useMemo } from 'react';
import { AreaClosed, LinePath, Bar } from '@visx/shape';
import { PickD3Scale, scaleTime, scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { extent } from 'd3-array';

// utils
// import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// constants
import { STEPS, WORDS } from './constants';
import { values } from 'lodash';

export const Chart: FC = ({ width, height }) => {
  const [historicData, setHistoricData] = useState([]);
  const [wewData, setWewData] = useState([]);
  const [wawData, setWawData] = useState([]);

  useEffect(() => {
    fetch(
      'https://storage.googleapis.com/ecf-agricultural-climate-impact/TabularData/historic_GHG_emissions_spain.json',
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setHistoricData(json);
      });
    fetch(
      'https://storage.googleapis.com/ecf-agricultural-climate-impact/TabularData/projected_WeW_GHG_emissions_spain.json',
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setWewData(json);
      });
    fetch(
      'https://storage.googleapis.com/ecf-agricultural-climate-impact/TabularData/projected_WaW_GHG_emissions_spain.json',
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setWawData(json);
      });
  }, []);

  const margin = { top: 20, right: 20, bottom: 20, left: 30 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Defining selector functions
  const getValue = (d) => d.value;
  const getYear = (d) => d.year;

  // Format date for axis
  const formatDate = (year) => year.toString();

  // Defining scales

  const concatData = historicData.concat(wewData);

  // horizontal, x scale
  const timeScale = scaleLinear({
    range: [0, innerWidth],
    domain: extent(concatData, getYear),
    nice: true,
  });

  // vertical, y scale
  const valueScale = scaleLinear({
    range: [innerHeight, 0],
    domain: extent(historicData, getValue),
    nice: true,
  });

  return (
    <div>
      <svg width={width + margin.left} height={height + margin.top}>
        <Group left={margin.left} top={margin.top}>
          <AxisLeft
            hideAxisLine={true}
            hideTicks={true}
            scale={valueScale}
            tickLabelProps={() => ({
              fill: '#EDF2F7',
              fontSize: 9,
              fontWeight: 600,
              textAnchor: 'end',
              alignmentBaseline: 'after-edge',
            })}
          />
          <AxisBottom
            hideAxisLine={true}
            hideTicks={true}
            scale={timeScale}
            top={innerHeight}
            tickFormat={formatDate}
            tickLabelProps={() => ({
              fill: '#EDF2F7',
              fontSize: 9,
              fontWeight: 600,
              textAnchor: 'end',
            })}
          />
          <LinePath
            key={'line-historic'}
            stroke="white"
            strokeWidth={2}
            strokeLinejoin="round"
            data={historicData}
            x={(d) => timeScale(getYear(d)) ?? 0}
            y={(d) => valueScale(getValue(d)) ?? 0}
          />
          <LinePath
            key={'line-wew'}
            stroke="white"
            strokeDasharray={'2,2'}
            strokeWidth={2}
            strokeLinecap="butt"
            data={wewData}
            x={(d) => timeScale(getYear(d)) ?? 0}
            y={(d) => valueScale(getValue(d)) ?? 0}
          />
          <LinePath
            key={'line-waw'}
            stroke="white"
            strokeDasharray={'2,2'}
            strokeWidth={2}
            strokeLinecap="butt"
            data={wawData}
            x={(d) => timeScale(getYear(d)) ?? 0}
            y={(d) => valueScale(getValue(d)) ?? 0}
          />
        </Group>
      </svg>
    </div>
  );
};

export default Chart;

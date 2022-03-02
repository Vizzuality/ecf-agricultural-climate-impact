import { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { AreaClosed, Line, LinePath, Bar } from '@visx/shape';
import { PickD3Scale, scaleTime, scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { useTooltip, useTooltipInPortal, TooltipWithBounds } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { max, extent, bisector } from 'd3-array';

// utils
// import { Desktop, MediaContextProvider, Mobile } from 'utils/responsive';

// constants
import { STEPS, WORDS } from './constants';
import { values } from 'lodash';

export const Chart: FC = ({ width, height }) => {
  const [historicData, setHistoricData] = useState([]);
  const [wewData, setWewData] = useState([]);
  const [wawData, setWawData] = useState([]);
  const [lastWewPoint, setLastWewPoint] = useState([]);
  const [lastWawPoint, setLastWawPoint] = useState([]);

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
        setLastWewPoint(json[json.length - 1]);
      });
    fetch(
      'https://storage.googleapis.com/ecf-agricultural-climate-impact/TabularData/projected_WaW_GHG_emissions_spain.json',
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setWawData(json);
        setLastWawPoint(json[json.length - 1]);
      });
  }, []);

  // size adjustments
  const margin = { top: 20, right: 100, bottom: 20, left: 70 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Defining selector functions
  const getValue = (d) => d.value;
  const getYear = (d) => d.year;
  const bisectDate = bisector((d) => new Date(d.year)).left;

  // Format date for axis
  const formatDate = (year) => year.toString();

  const concatData = historicData.concat(wewData);

  // Defining scales
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

  // tooltip
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // use TooltipWithBounds
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true,
  });

  // tooltip handler
  const handleTooltip = useCallback(
    (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = timeScale.invert(x);
      const index = bisectDate(concatData, x0, 1);
      const d0 = concatData[index - 1];
      const d1 = concatData[index];
      let d = d0;
      if (d1 && getYear(d1)) {
        d = x0.valueOf() - getYear(d0).valueOf() > getYear(d1).valueOf() - x0.valueOf() ? d1 : d0;
      }

      if (x0 > historicData[0].year && x0 < historicData[historicData.length - 1].year) {
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: valueScale(getValue(d)),
        });
      }
    },
    [showTooltip, valueScale, timeScale],
  );

  return (
    <div className="relative">
      <svg ref={containerRef} width={width} height={height + margin.top}>
        <Group top={margin.top}>
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
          {[lastWewPoint, lastWawPoint].map((d, i) => {
            const w = 8;
            const x = timeScale(getYear(d)) - w / 2 ?? 0;
            const y = valueScale(getValue(d)) - w / 2 ?? 0;
            return (
              <rect
                id={`line-cap-${i}`}
                key={`line-cap-${i}`}
                width={w}
                height={w}
                x={x}
                y={y}
                // transform="rotate(2)"
                fill="white"
              />
            );
          })}
          <text
            x={timeScale(getYear(lastWewPoint) + 3) ?? 0}
            y={valueScale(getValue(lastWewPoint)) ?? 0}
            fill="#EDF2F7"
            fontSize="12"
          >
            <tspan>Calentamiento</tspan>
            <tspan
              x={timeScale(getYear(lastWewPoint) + 3) ?? 0}
              y={valueScale(getValue(lastWewPoint)) + 12 ?? 0}
            >
              de 2ºC
            </tspan>
          </text>
          <text
            x={timeScale(getYear(lastWawPoint) + 3) ?? 0}
            y={valueScale(getValue(lastWawPoint)) ?? 0}
            fill="#EDF2F7"
            fontSize="12"
          >
            <tspan>Calentamiento</tspan>
            <tspan
              x={timeScale(getYear(lastWawPoint) + 3) ?? 0}
              y={valueScale(getValue(lastWawPoint)) + 12 ?? 0}
            >
              de 1.5ºC
            </tspan>
          </text>
          <rect
            id="bg"
            key="bg"
            width="100%"
            height="100%"
            x="0"
            y="0"
            onMouseMove={handleTooltip}
            onMouseOut={hideTooltip}
            // transform="rotate(2)"
            fill="transparent"
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: tooltipTop }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={'red'}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </Group>
      </svg>
      {tooltipOpen && (
        <TooltipInPortal
          // set this to random so it correctly updates with parent bounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          Data value <strong>safasf</strong>
        </TooltipInPortal>
      )}
    </div>
  );
};

export default Chart;

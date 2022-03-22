/* eslint-disable prettier/prettier */
import { FC, useState, useEffect, useCallback, useMemo } from 'react';
import { Line, LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { useTooltip, useTooltipInPortal, Tooltip, defaultStyles, TooltipWithBounds } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { GlyphCircle } from '@visx/glyph';
import { extent, bisector } from 'd3-array';

import { DatasetItem, useClimateRiskData } from 'hooks/charts';

// types
import type { ChartProps, TooltipData } from '../types';

// Defining selector functions
const getValue = (d: DatasetItem) => d.value;
const getYear = (d: DatasetItem) => new Date(d.year);
const bisectDate = bisector((d: DatasetItem) => new Date(d.year)).left;

// Format date for axis
const formatDate = (year) => year.toString();

export const Chart: FC<ChartProps> = ({ width, height }) => {
  // const [historicData, setHistoricData] = useState([]);
  // const [wewData, setWewData] = useState([]);
  // const [wawData, setWawData] = useState([]);
  const [lastWewPoint, setLastWewPoint] = useState([]);
  const [lastWawPoint, setLastWawPoint] = useState([]);

  const [historicData, wewData, wawData] = useClimateRiskData();
  const isFetching = historicData.isFetching || wewData.isFetching || wawData.isFetching;

  // size adjustments
  const margin = { top: 20, right: 100, bottom: 20, left: 70 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Whole data
  const concatData = useMemo(
    () => historicData.data.concat(wewData.data).concat(wawData.data),
    [historicData.data, wawData.data, wewData.data]
  );

  console.log(concatData)

  const getDataByYear = useCallback(
    (year: DatasetItem['year']) => concatData.filter((d) => d.year === year)
    , [concatData]
  );

  // Defining scales
  // horizontal, x scale
  const timeScale = useMemo(() => scaleLinear({
    range: [0, innerWidth],
    domain: extent(concatData, getYear),
    nice: true,
  }), [concatData, innerWidth]);

  // vertical, y scale
  const valueScale = useMemo(() => scaleLinear({
    range: [innerHeight, 0],
    domain: extent(concatData, getValue),
    nice: true,
  }), [concatData, innerHeight]);

  // tooltip
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip<TooltipData[]>();

  const { containerRef } = useTooltipInPortal({
    // use TooltipWithBounds
    detectBounds: true,
    // when tooltip containers are scrolled,
    // this will correctly update the Tooltip position
    scroll: true,
  });

  // tooltip handler
  const handleTooltip = useCallback(
    (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
      if (isFetching) return null;

      const { x } = localPoint(event) || { x: 0 };
      const x0 = timeScale.invert(x - margin.left);
      const index = bisectDate(concatData, x0, 1);
      const d0 = concatData[index - 1];
      const d1 = concatData[index];
      let d = d0;

      if (d1 && getYear(d1)) {
        d = x0.valueOf() - getYear(d0).valueOf() >
          getYear(d1).valueOf() - x0.valueOf() ? d1 : d0;
      }

      showTooltip({
        tooltipData: getDataByYear(d.year),
        tooltipLeft: x - margin.left,
        tooltipTop: valueScale(getValue(d)),
      });

      // if (x0 > concatData[0].year
      //   && x0 < concatData[concatData.length - 1].year) {
      //   showTooltip({
      //     tooltipData: d,
      //     tooltipLeft: x - margin.left,
      //     tooltipTop: valueScale(getValue(d)),
      //   });
      // }
    },
    [isFetching, timeScale, margin.left, concatData, showTooltip, getDataByYear, valueScale],
  );

  return (
    <div className="relative">
      <svg ref={containerRef} width={width} height={height + margin.top}>
        <Group
          left={margin.left}
          top={margin.top}
        >
          <AxisLeft
            hideAxisLine={true}
            hideTicks={true}
            scale={valueScale}
            tickLabelProps={() => ({
              fill: '#EDF2F7',
              fontSize: 10,
              fontWeight: 600,
              textAnchor: 'end',
              alignmentBaseline: 'after-edge',
              opacity: '0.5',
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
              fontSize: 10,
              fontWeight: 600,
              textAnchor: 'end',
              opacity: '0.5',
            })}
          />
          <LinePath
            key={'line-historic'}
            stroke="white"
            strokeWidth={2}
            strokeLinejoin="round"
            data={historicData.data}
            x={(d) => timeScale(getYear(d)) ?? 0}
            y={(d) => valueScale(getValue(d)) ?? 0}
          />
          <LinePath
            key={'line-wew'}
            stroke="white"
            strokeDasharray={'2,2'}
            strokeWidth={2}
            strokeLinecap="butt"
            data={wewData.data}
            x={(d) => timeScale(getYear(d)) ?? 0}
            y={(d) => valueScale(getValue(d)) ?? 0}
          />
          <LinePath
            key={'line-waw'}
            stroke="white"
            strokeDasharray={'2,2'}
            strokeWidth={2}
            strokeLinecap="butt"
            data={wawData.data}
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
          {/* <text
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
          </text> */}

          {/* Tooltip */}
          {/* {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top - 20 }}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
            </g>
          )} */}

          {tooltipData && tooltipData.map((d) => (
            <GlyphCircle
              key={Math.random()}
              left={tooltipLeft}
              top={valueScale(d.value) - 1}
              size={110}
              fill="#B23E3E"
              stroke="white"
              strokeWidth={2}
            />
          ))}

          <rect
            width={innerWidth}
            height={innerHeight}
            x={0}
            y={0}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={hideTooltip}
            fill="transparent"
          />
        </Group>
      </svg>
      {tooltipData && (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop - 30}
          left={tooltipLeft + 80}
          style={{
            ...defaultStyles,
            minWidth: 80,
            // transform: 'translateX(-50%)',
            // borderRadius: '0',
            // boxShadow: 'none',
            // padding: '10px',
          }}
        >
          <div>
            <span style={{
              position: 'absolute',
              content: '',
              top: '100%',
              left: '50%',
              width: '0',
              height: '0',
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid white',
              transform: 'translateX(-50%)',
            }} />
            {tooltipData.map((d) => (
              <div className="font-bold" key={d.value}>
                {d.value} {d.unit}
              </div>
            ))}
          </div>
        </TooltipWithBounds>
      )}
      {/* {tooltipData && (
        <TooltipWithBounds
          key={Math.random()}
          top={innerHeight + 18.5}
          left={tooltipLeft + margin.left - 10}
          style={{
            ...defaultStyles,
            transform: 'translateX(-50%)',
            borderRadius: '0',
            boxShadow: 'none',
            padding: '2px 4px',
            backgroundColor: '#A93C3C',
            color: 'white',
            fontSize: '10px',
          }}
        >
          <strong>{tooltipData[0].year}</strong>
        </TooltipWithBounds>
      )} */}
    </div>
  );
};

export default Chart;

import { useCallback, useMemo } from 'react';
import { Line, LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { AxisLeft, AxisBottom } from '@visx/axis';
import {
  useTooltip,
  useTooltipInPortal,
  Tooltip,
  defaultStyles,
  TooltipWithBounds,
} from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { GlyphCircle } from '@visx/glyph';
import { extent, bisector } from 'd3-array';

import { DatasetItem, useClimateRiskData } from 'hooks/charts';

// types
import type { ChartProps } from '../types';

// Defining selector functions
const getValue = (d: DatasetItem) => d?.value;
const getYear = (d: DatasetItem) => new Date(d?.year);
const bisectDate = bisector<DatasetItem, number>((d: DatasetItem) => d?.year).left;

// Format date for axis
const formatDate = (year) => year.toString();

export const Chart: React.FC<ChartProps> = ({ width, height }) => {
  const [historicData, wewData, wawData] = useClimateRiskData();
  const isFetching = historicData.isFetching || wewData.isFetching || wawData.isFetching;

  const lastHistoricPoint = useMemo(
    () => historicData.data[historicData.data.length - 1],
    [historicData],
  );
  const lastWewPoint = useMemo(() => wewData.data[wewData.data.length - 1], [wewData]);
  const lastWawPoint = useMemo(() => wawData.data[wawData.data.length - 1], [wawData]);

  // size adjustments
  const margin = { top: 40, right: 100, bottom: 50, left: 70 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Whole data
  const concatData = useMemo(
    () => historicData.data.concat(wewData.data).concat(wawData.data),
    [historicData.data, wawData.data, wewData.data],
  );

  const getDataByYear = useCallback(
    (data: DatasetItem) => concatData.filter((d) => d.year === data.year),
    [concatData],
  );

  // Defining scales
  // horizontal, x scale
  const timeScale = useMemo(
    () =>
      scaleLinear({
        range: [0, innerWidth],
        domain: extent(concatData, getYear),
        // nice: true,
      }),
    [concatData, innerWidth],
  );

  // vertical, y scale
  const valueScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight, 0],
        domain: extent(concatData, getValue),
        // nice: true,
      }),
    [concatData, innerHeight],
  );

  // tooltip
  const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } =
    useTooltip<DatasetItem[]>();

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
        d = x0.valueOf() - getYear(d0).valueOf() > getYear(d1).valueOf() - x0.valueOf() ? d1 : d0;
      }

      const currentData = getDataByYear(d);
      const values = currentData.map((d) => d.value);

      showTooltip({
        tooltipData: currentData,
        tooltipLeft: x - margin.left,
        tooltipTop: valueScale(Math.max(...values)),
      });
    },
    [isFetching, timeScale, margin.left, concatData, showTooltip, getDataByYear, valueScale],
  );

  return (
    <div className="relative">
      <svg ref={containerRef} width={width} height={height + margin.top}>
        <Group left={margin.left} top={margin.top}>
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
            stroke="white"
            strokeWidth={2}
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
            data={[lastHistoricPoint, ...wewData.data]}
            x={(d) => timeScale(getYear(d)) ?? 0}
            y={(d) => valueScale(getValue(d)) ?? 0}
          />
          <LinePath
            key={'line-waw'}
            stroke="white"
            strokeDasharray={'2,2'}
            strokeWidth={2}
            strokeLinecap="butt"
            data={[lastHistoricPoint, ...wawData.data]}
            x={(d) => timeScale(getYear(d)) ?? 0}
            y={(d) => valueScale(getValue(d)) ?? 0}
          />
          {[lastWewPoint, lastWawPoint].map((d, i) => {
            const w = 8;
            const x = timeScale(getYear(d)) - w / 2 ?? 0;
            const y = valueScale(getValue(d)) - w / 2 ?? 0;
            return (
              <g key={Math.random()}>
                <rect
                  id={`line-cap-${i}`}
                  key={`line-cap-${i}`}
                  width={w}
                  height={w}
                  x={x}
                  y={y}
                  fill="white"
                />
              </g>
            );
          })}
          {lastWewPoint && (
            <text
              x={timeScale(getYear(lastWewPoint)) + 10 ?? 0}
              y={valueScale(getValue(lastWewPoint)) ?? 0}
              fill="#EDF2F7"
              fontSize="12"
            >
              <tspan>Calentamiento</tspan>
              <tspan
                x={timeScale(getYear(lastWewPoint)) + 10 ?? 0}
                y={valueScale(getValue(lastWewPoint)) + 12 ?? 0}
              >
                de 2ºC
              </tspan>
            </text>
          )}
          {lastWawPoint && (
            <text
              x={timeScale(getYear(lastWawPoint)) + 10 ?? 0}
              y={valueScale(getValue(lastWawPoint)) ?? 0}
              fill="#EDF2F7"
              fontSize="12"
            >
              <tspan>Calentamiento</tspan>
              <tspan
                x={timeScale(getYear(lastWawPoint)) + 10 ?? 0}
                y={valueScale(getValue(lastWawPoint)) + 12 ?? 0}
              >
                de 1.5ºC
              </tspan>
            </text>
          )}

          {/* Tooltip: line and circle */}
          {tooltipData &&
            tooltipData.map((d) => (
              <g key={Math.random()}>
                <Line
                  from={{ x: tooltipLeft, y: valueScale(d.value) }}
                  to={{ x: tooltipLeft, y: innerHeight + margin.top - 20 }}
                  stroke="white"
                  strokeWidth={2}
                  pointerEvents="none"
                  strokeDasharray="5,2"
                />
                <GlyphCircle
                  left={tooltipLeft + 1}
                  top={valueScale(d.value) + 1}
                  size={110}
                  fill="#B23E3E"
                  stroke="white"
                  strokeWidth={2}
                />
              </g>
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
      {/* Tooltip: pop-up */}
      {tooltipData && (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            ...defaultStyles,
            borderRadius: '0',
          }}
          offsetLeft={0}
          offsetTop={-10}
        >
          {/* <span style={{
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
          }} /> */}
          {tooltipData.map((d) => (
            <div className="font-bold" key={`tooltip-item-${Math.random()}`}>
              {d.value} {d.unit}
            </div>
          ))}
        </TooltipWithBounds>
      )}
      {tooltipData && (
        <Tooltip
          key={Math.random()}
          top={innerHeight + margin.top - 1}
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
        </Tooltip>
      )}
    </div>
  );
};

export default Chart;

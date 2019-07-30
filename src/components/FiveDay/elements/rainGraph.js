import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Line, Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { Grid } from '@vx/grid';
import { GradientTealBlue } from '@vx/gradient';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { scaleBand, scaleLinear } from '@vx/scale';


const RainGraph = ({ data }) => {

   const [visible, toggleVisibility] = useState(window.innerWidth > 900 ? true : false);

   // accessors

   const x = data => data.date;
   const y = data => data.value;

   const width = 600;
   const height = 400;

   const margin = {
      top: 20,
      bottom: 65,
      left: 80,
      right: 20,
   };

   // bounds

   const xMax = width - margin.left - margin.right;
   const yMax = height - margin.top - margin.bottom;

   // scales

   const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.4
   });

   const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      domain: [0, Math.max(...data.map(y))]
   });

   const display = visible ? { height: height } : { height: '0px' };

   return (
      <div className="fiveday__graph">
         <button onClick={() => toggleVisibility(!visible)} className="fiveday__graph-heading">{visible ? "Hide" : "Show"} Rain chart</button>
         <svg style={display} width={width} height={height} viewBox={` 0 0 ${width} ${height}`}>
            <GradientTealBlue id="teal" />
            <rect width={width} height={height} fill="#fff" rx={14} />
            <Grid
               top={margin.top}
               left={margin.left}
               xScale={xScale}
               yScale={yScale}
               stroke="rgba(49, 112, 142, 0.8)"
               width={xMax}
               height={0}
               numTicksRows={10}
               numTicksColumns={0}
            />
            <Group top={margin.top} left={margin.left}>
               {data.map((d) => {
                  const letter = x(d);
                  const barWidth = xScale.bandwidth();
                  const barHeight = yMax - yScale(y(d));
                  const barX = xScale(letter);
                  const barY = yMax - barHeight;
                  return (
                     <Bar
                        key={`bar-${letter}`}
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={barHeight}
                        fill="rgba(49, 112, 142, 1)"
                     />
                  );
               })}
            </Group>
            <AxisLeft
               top={margin.top}
               left={margin.left}
               scale={yScale}
               numTicks={10}
               label="Precipitation"
               labelProps={{
                  fill: '#31708e',
                  textAnchor: 'middle',
                  fontSize: 14,
                  dx: '-1.5em',
                  fontFamily: 'Open Sans'
               }}
               stroke="#31708e"
               tickStroke="#31708e"
               tickLabelProps={() => ({
                  fill: '#31708e',
                  textAnchor: 'end',
                  fontSize: 12,
                  fontFamily: 'Open Sans',
                  dx: '-0.25em',
                  dy: '0.25em'
               })}
               tickComponent={({ formattedValue, ...tickProps }) => (
                  <text {...tickProps}>{formattedValue} mm</text>
               )}
            />
            <AxisBottom
               top={yMax + margin.top}
               left={margin.left}
               scale={xScale}
               stroke="black"
               tickStroke="black"
               hideAxisLine={true}
               label="Days"
            >
               {axis => {
                  const tickLabelSize = 14;
                  const tickColor = '#31708e';
                  return (
                     <g>
                        {axis.ticks.map((tick, i) => {
                           const tickX = tick.to.x;
                           const tickY = tick.to.y + tickLabelSize + axis.tickLength;
                           const date = new Date(tick.value);
                           const new_label = date.toLocaleDateString(navigator.language, { weekday: "short", day: "numeric", month: "short" })
                           return (
                              <Group key={`vx-tick-${tick.value}-${i}`} className={'vx-axis-tick'}>
                                 <Line from={tick.from} to={tick.to} stroke={tickColor} />
                                 <text
                                    transform={`translate(${tickX}, ${tickY})`}
                                    fontSize={tickLabelSize}
                                    textAnchor="middle"
                                    fill={tickColor}
                                 >
                                    {new_label}
                                 </text>
                              </Group>
                           );
                        })}
                     </g>
                  );
               }}
            </AxisBottom>
         </svg>
      </div>
   );
};

export default RainGraph;

RainGraph.propTypes = {
   data: PropTypes.array,
   windowWidth: PropTypes.number
}
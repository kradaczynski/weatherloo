import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@vx/grid';
import { Group } from '@vx/group';
import { curveBasis } from '@vx/curve';
import { GradientOrangeRed } from '@vx/gradient';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Area, LinePath, Line } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent } from 'd3-array';

const TempGraph = ({ data }) => {

   const [visible, toggleVisibility] = useState(window.innerWidth > 900 ? true : false);

   const width = 600;
   const height = 400;

   const margin = {
      top: 20,
      bottom: 62,
      left: 70,
      right: 20,
   };

   // accessors

   const x = data => data.date;
   const y = data => data.value;

   // bounds

   const xMax = width - margin.left - margin.right;
   const yMax = height - margin.top - margin.bottom;

   // scales

   const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(data, x)
   });

   const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, Math.max(...data.map(y))],
      nice: true
   });

   const display = visible ? { height: height } : { height: '0px' };

   return (
      <div className="fiveday__graph">
         <button onClick={() => toggleVisibility(!visible)} className="fiveday__graph-heading">{visible ? "Hide" : "Show"} Temperature chart</button>
         <svg style={display} width={width} height={height} viewBox={` 0 0 ${width} ${height}`}>
            <GradientOrangeRed id="linear" vertical={false} fromOpacity={0.7} toOpacity={0.9} />
            <rect x={0} y={0} width={width} height={height} fill="#fff" />
            <Grid
               top={margin.top}
               left={margin.left}
               xScale={xScale}
               yScale={yScale}
               stroke="rgba(49, 112, 142, 0.7)"
               width={xMax}
               height={yMax}
               numTicksRows={10}
               numTicksColumns={10}
            />
            <Group top={margin.top} left={margin.left}>
               <Area
                  data={data}
                  x={d => xScale(x(d))}
                  y0={() => yScale.range()[0]}
                  y1={d => yScale(y(d))}
                  strokeWidth={2}
                  stroke={'transparent'}
                  fill={'url(#linear)'}
                  curve={curveBasis}
               />
               <LinePath
                  data={data}
                  x={d => xScale(x(d))}
                  y={d => yScale(y(d))}
                  stroke={"url('#linear')"}
                  strokeWidth={2}
                  curve={curveBasis}
               />
            </Group>
            <Group left={margin.left}>
               <AxisLeft
                  top={margin.top}
                  left={0}
                  scale={yScale}
                  hideZero
                  numTicks={10}
                  label="Degrees in Celcius"
                  labelProps={{
                     fill: '#31708e',
                     textAnchor: 'middle',
                     fontSize: 14,
                     fontFamily: 'Open Sans',
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
                     <text {...tickProps}>{formattedValue}&#176;</text>
                  )}
               />
               <AxisBottom
                  top={height - margin.bottom}
                  left={0}
                  scale={xScale}
                  numTicks={10}
                  hideZero={false}
               >
                  {axis => {
                     const tickLabelSize = 14;
                     const tickRotate = 30;
                     const tickColor = '#31708e';
                     return (
                        <g>
                           {axis.ticks.map((tick, i) => {
                              const tickX = tick.to.x;
                              const tickY = tick.to.y + tickLabelSize + axis.tickLength;
                              const date = new Date(tick.value);
                              const new_label = date.toLocaleDateString(navigator.language, { weekday: "short", hour: "2-digit", minute: "2-digit" })
                              return (
                                 <Group key={`vx-tick-${tick.value}-${i}`} className={'vx-axis-tick'}>
                                    <Line from={tick.from} to={tick.to} stroke={tickColor} />
                                    <text
                                       transform={`translate(${tickX}, ${tickY}) rotate(${tickRotate})`}
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
            </Group>
         </svg>
      </div>
   );
};

export default TempGraph;

TempGraph.propTypes = {
   data: PropTypes.array,
   windowWidth: PropTypes.number
}
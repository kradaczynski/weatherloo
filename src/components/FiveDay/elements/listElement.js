import React from 'react';
import PropTypes from 'prop-types';

import { kelvinToCelcius, windForceName } from '../../../helpers';

const listElement = props => {
   const { time, icon, desc, speed, humidity, pressure, temp } = props.data;
   const src = `http://openweathermap.org/img/wn/${icon}.png`;
   return (
      <div className="fiveday__listitem">
         <div className="fiveday__left">
            <time>{time}</time>
            <img alt="icon" src={src} />
            <p>{kelvinToCelcius(temp)}&#176;C</p>
         </div>
         <div className="fiveday__right">
            <p>{desc}, {pressure.toFixed(0)} hpa</p>
            <p>{windForceName(speed)}, humidity: {humidity}%</p>
         </div>
      </div>
   );
}

export default listElement;

listElement.propTypes = {
   data: PropTypes.object
}
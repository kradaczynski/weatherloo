import React from 'react';
import PropTypes from 'prop-types';

const iconbox = ({ src, temp }) => {
   return (
      <div className="heading__iconbox">
         <div className="heading__iconwrapper">
            <img alt="icon" src={src} />
            <span className="heading__temperature">{temp}&#176;C</span>
         </div>
      </div>
   );
}

export default iconbox;

iconbox.propTypes = {
   src: PropTypes.string,
   temp: PropTypes.number
}
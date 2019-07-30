import React from 'react';
import PropTypes from 'prop-types';

const basic = ({ city, country, time, text }) => {
   return (
      <div className="heading__textbox">
         <h1 className="heading-primary">{text} <span className="heading__city">{city}, {country}</span></h1>
         <h2 className="heading-secondary">Updated: <span className="heading__city">{time}</span></h2>
      </div>
   );
}

export default basic;
basic.propTypes = {
   city: PropTypes.string,
   country: PropTypes.string,
   text: PropTypes.string,
   time: PropTypes.string
}
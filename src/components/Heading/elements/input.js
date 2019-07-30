import React from 'react';
import PropTypes from 'prop-types';

const input = ({ changed, value }) => {
   return (
      <input
         placeholder="Your city name"
         type="text" className="heading__input"
         onChange={(e) => changed(e.target.value)}
         value={value} />
   );
}

export default input;

input.propTypes = {
   changed: PropTypes.func,
   value: PropTypes.string
}
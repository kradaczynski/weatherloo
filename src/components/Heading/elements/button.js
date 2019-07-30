import React from 'react';
import PropTypes from 'prop-types';

const button = ({ clicked, text }) => {
   return (
      <button
         className="button--heading2 button"
         onClick={clicked}>
         {text}
      </button>
   );
}

export default button;

button.propTypes = {
   clicked: PropTypes.func,
   text: PropTypes.string
}
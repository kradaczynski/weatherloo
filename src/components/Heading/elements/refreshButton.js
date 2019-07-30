import React from 'react';
import PropTypes from 'prop-types';

const refreshButton = ({ clicked }) => {
   return (
      <div className="heading__buttonbox">
         <button className="button--heading1 button" onClick={() => clicked()}>Refresh</button>
      </div>
   );
}

export default refreshButton;

refreshButton.propTypes = {
   clicked: PropTypes.func
}
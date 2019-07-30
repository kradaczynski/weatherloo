import React from 'react';
import PropTypes from 'prop-types';

const errors = ({ errors }) => {
   return <p className="heading__error">{errors[0]}</p>
}

export default errors;

errors.propTypes = {
   errors: PropTypes.array
}
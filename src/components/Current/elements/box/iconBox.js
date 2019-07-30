import React from 'react';
import PropTypes from 'prop-types';

const iconBox = ({ name }) => {
   return <div className="box__iconbox"><i className={name} /></div>;
}

export default iconBox;

iconBox.propTypes = {
   name: PropTypes.string
}
import React from 'react';
import PropTypes from 'prop-types';

const title = props => {
   return <div className="box__title">{props.name}</div>;
}

export default title;

title.propTypes = {
   name: PropTypes.string
}
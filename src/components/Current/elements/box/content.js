import React from 'react';
import PropTypes from 'prop-types';

const content = ({ data }) => {

   const values = Object.keys(data).map(item => {
      return <p key={item} className="box__item">{data[item]}</p>;
   })
   return <div className="box__content">{values}</div>;
}

export default content;

content.propTypes = {
   data: PropTypes.array
}
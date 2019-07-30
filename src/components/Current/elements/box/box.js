import React from 'react';
import PropTypes from 'prop-types';

import './box.scss';

import IconBox from './iconBox';
import TextBox from './textBox';

const box = ({ data }) => {
   return (
      <div className="box">
         <IconBox name={data.icon} />
         <TextBox name={data.name} value={data.value} />
      </div>
   );
}

export default box;

box.propTypes = {
   data: PropTypes.object,
}
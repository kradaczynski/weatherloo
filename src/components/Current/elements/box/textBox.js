import React from 'react';
import PropTypes from 'prop-types';

import Title from './title';
import Content from './content';

const textBox = ({ name, value }) => {
   return (
      <div className="box__textbox">
         <Title name={name} />
         <Content data={value} />
      </div>
   );
}

export default textBox;

textBox.propTypes = {
   name: PropTypes.string,
   value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
   ])
}
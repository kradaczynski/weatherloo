import React from 'react';
import PropTypes from 'prop-types';

import ListElement from './listElement';

const listBox = ({ name, data }) => {

   const items = data.map((el, index) => {
      return <ListElement key={index} data={{ ...el }} />;
   })

   return (
      <div className="fiveday__item">
         <div className="fiveday__header">{name}</div>
         {items}
      </div>
   );
}

export default listBox;

listBox.propTypes = {
   name: PropTypes.string,
   data: PropTypes.array
}
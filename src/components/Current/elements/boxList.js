import React from 'react';
import PropTypes from 'prop-types';

import './boxList.scss';

import Box from './box/box';

const boxList = props => {

   const data = Object.keys(props.data).map(key => {
      return <Box key={key} data={props.data[key]} />
   });

   return (
      <div className="boxlist">
         {data}
      </div>
   );
}

export default boxList;

boxList.propTypes = {
   data: PropTypes.object
}
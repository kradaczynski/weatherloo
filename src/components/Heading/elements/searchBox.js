import React from 'react';
import PropTypes from 'prop-types';

import Input from './input';
import Button from './button';
import Errors from './errors';

const searchBox = ({ inputHandler, city, submitHandler, errors }) => {
   return (
      <div className="heading__searchbox">
         <p className="heading__searchtext">Search by location</p>
         <div className="heading__inputbox">
            <Input
               changed={inputHandler}
               value={city}
            />
            <Button
               clicked={() => submitHandler(city)}
               text='Search'
            />
            <Errors errors={errors} />
         </div>
      </div>
   );
}

export default searchBox;

searchBox.propTypes = {
   inputHandler: PropTypes.func,
   city: PropTypes.string,
   submitHandler: PropTypes.func,
   errors: PropTypes.array
}
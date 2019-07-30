import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './Header.scss';

const header = () => {
    return (
        <div className="header">
            <div className="row header__wrapper">
                <div className="header__logobox">
                    <Link to="/" className="header__logo">Weatherloo</Link>
                </div>
                <div className="header__links">
                    <NavLink to="/" exact activeClassName="active" className="button">Current Weather</NavLink>
                    <NavLink to="/five-day-forecast" exact activeClassName="active" className="button">5 Day Forecast</NavLink>
                </div>
            </div>
        </div>
    );
};

export default header;
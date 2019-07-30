import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.scss';

import Header from './Header';
import Current from './Current/Current';
import FiveDay from './FiveDay/FiveDay';

const App = () => {

    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Route path="/" exact component={Current} />
                <Route path="/five-day-forecast" component={FiveDay} />
            </BrowserRouter>
        </div>
    );
}

export default App;

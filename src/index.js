import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import './index.scss';

import App from './components/App';
import reducers from './reducers';

const store = createStore(
    reducers,
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>, document.querySelector('#root'));
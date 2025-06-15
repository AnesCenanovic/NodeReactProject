import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

const el = document.getElementById("root");

const store = createStore (() => reducers, {}, applyMiddleware());

const root = ReactDOM.createRoot(el);

root.render(
    <Provider store={store}><App/></Provider>,
);


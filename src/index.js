import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';  // viene en el package de react-router-dom

//import { Provider } from 'react-redux'; // importamos Provider 
//import { BrowserRouter as Router } from 'react-router-dom';
import Root from './Root';

import './index.css';

import storage from './utils/storage';
import { configureClient } from './api/client';
import configureStore from './store'; // importamos el store de redux
//import { authLoginSuccess } from './store/actions';


const accessToken = storage.get('auth');
configureClient({ accessToken });

// creamos el history
const history = createBrowserHistory()

// creamos el store y le pasamos si el usuario está logeado en el preLoadedState
const store = configureStore({
  //preLooadedState: { auth: !!accessToken, adverts: [] },
  preLooadedState: { auth: !!accessToken },
  history,
});
// console.log(store.getState());
// store.dispatch(authLoginSuccess());
// console.log(store.getState());

const render = () => {
  ReactDOM.render(
    <Root store={store} history={history} />,
    document.getElementById('root')
  )
};

render();



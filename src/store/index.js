// Definición del store
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
//import reducer from './reducers';
import * as reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';

// Importamos los objetos de llamadas a las APIS
//import * as auth from '../api/auth';
//import * as adverts from '../api/adverts';

import * as api from '../api';

//const api = {auth, adverts}
//console.log(auth);
//console.log(reducers);

const logger = createLogger();

const configureStore = ({ preLoadedState, history }) => {

    // con el withExtraArgument podemos insertar el api y el history
    const middleware = [routerMiddleware(history),thunk.withExtraArgument({ api, history }), logger];  // array de middlewares

    //const store = createStore(reducer, preLoadedState, composeWithDevTools());
    // añadimos un reducer para el router
    const store = createStore(combineReducers({ ...reducers, router: connectRouter(history) }),
        preLoadedState,
        composeWithDevTools(applyMiddleware(...middleware)));
    return store;
};

export default configureStore;
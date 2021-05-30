import React from 'react';
import { Provider } from 'react-redux';
//import { BrowserRouter as Router } from 'react-router-dom'; 
// en lugar de utilizar el browserRouter utilizamos el Router y le insertamos el history

//import { Router } from 'react-router-dom';
// Para tener router en el estado de redux cambiamos el router
import { ConnectedRouter as Router } from 'connected-react-router';

import App from './App';

export default function Root({ store, history }) {
    return (
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );
}

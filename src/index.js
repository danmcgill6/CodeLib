'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import {store,persistor} from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import rootReducer from './Redux';
import { createStore, applyMiddleware } from 'redux';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
            <App />
        </PersistGate>
    </Provider>,
 document.getElementById('root'));
registerServiceWorker();

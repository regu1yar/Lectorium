import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Redux from 'redux';
import {applyMiddleware} from 'redux';
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './routes';
import {Header} from "./components/header";
import ReduxThunk from "redux-thunk";
import {fetch_lectorium_data} from "./actions/lectorium_data";
import {rootReducer} from "./reducers";
import {checkAuth} from "./actions/authentication";
import moment from "moment";

moment.locale("ru");

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const store = Redux.createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(ReduxThunk))
);

async function main() {
    // await store.dispatch(login("Mask", "p"));
    // TODO: protected routes redirect to profile for the first page load even if user is authenticated
    // because auth fetching is in progress
    // - store authentication state also in local storage?
    store.dispatch(checkAuth);
    /*await*/ store.dispatch(fetch_lectorium_data);

    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <Header/>
                <MainRouter/>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
}

main();
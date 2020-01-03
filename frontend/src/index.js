import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Redux from 'redux';
import {lectorium, Status} from "./reducers";
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './routes';
import {Header} from "./components/header";
import {applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import {fetch_lectorium_data} from "./actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const store = Redux.createStore(
    lectorium,
    composeEnhancers(applyMiddleware(ReduxThunk))
);

async function main() {
    /*await*/ fetch_lectorium_data(store.dispatch);

    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Header/>
                    <MainRouter/>
                </div>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
}

main();
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Redux from 'redux';
import {Provider, connect} from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './routes';
import {Header} from "./components/header";
import {applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import {fetch_lectorium_data} from "./actions/lectorium_data";
import {rootReducer} from "./reducers";
import {LoginForm} from "./components/loginForm";
import {checkAuth, login} from "./actions/authentication";
import moment from "moment";


moment.locale("ru");


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const store = Redux.createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(ReduxThunk))
);

async function main() {
    // await store.dispatch(login("Mask", "p"));
    store.dispatch(checkAuth);
    /*await*/ store.dispatch(fetch_lectorium_data);

    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <LoginForm/>
                    <Header/>
                    <MainRouter/>
                </div>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
}

main();


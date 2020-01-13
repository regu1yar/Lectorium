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
import {checkAuth} from "./actions/authentication";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const store = Redux.createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(ReduxThunk))
);

fetch_lectorium_data(store.dispatch);

async function main() {
    store.dispatch(checkAuth);
    store.dispatch(fetch_lectorium_data);

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

// ReactDOM.render(
//     <div className={"ccc"}>
//         <div className={"bbb"}/>
//         <div className={"bbb"}/>
//         <div className={"bbb"}/>
//         <div className={"bbb"}/>
//         <div className={"bbb"}/>
//         <div className={"bbb"}/>
//         <div className={"bbb"}/>
//     </div>,
//     document.getElementById("root")
// )

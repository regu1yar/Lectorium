import {authentication} from "./authentication";
import {lectorium_data} from "./lectorium_data";
import {combineReducers} from "redux";

const rootReducer = combineReducers({authentication, lectorium_data});

export {rootReducer};
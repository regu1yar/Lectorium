import Axios from "axios";
import {api_url} from "../constants";

/*
Login is done by sending {username, password} as 'form' to `api/login`
Logout is done by POST to 'api/logout'
Session id is stored in cookies, there is no `tokens` or anything like this yet
 */


// TODO: error handling and loading indicators and ...

const setAuthenticated = (authenticated) => ({type: "AUTH", authenticated});

const login = (username, password) => async (dispatch) => {
    const data = new FormData();
    data.set("username", username);
    data.set("password", password);

    await Axios.post(api_url + "api/login", data, {
        headers: {'Content-Type': 'multipart/form-data'},

        // to allow CORS cookie tracking
        withCredentials: true,

        // TODO:
        // response is empty and has no content-length and content-type headers
        // without this argument someone is trying to parse a response as XML and then throwing and error
        responseType: "blob",
    });
    dispatch(setAuthenticated(true));
};

async function checkAuth(dispatch) {
    let resp;
    try {
        resp = await Axios.get(api_url + "api/whoami", {
            // to allow CORS cookie tracking
            withCredentials: true,
        });
    } catch (e) {
        dispatch(setAuthenticated(false));
        if (e.response && e.response.status === 403)
            return;
        throw e;
    }
    dispatch(setAuthenticated(true));
    console.log(`I am ${resp.data}`);
}

async function logout(dispatch, getState) {
    if (!getState().authentication.authenticated)
        return;

    // We don't care if the request succeeds
    Axios.post(api_url + "api/logout", undefined, {

        // to allow CORS cookie tracking
        withCredentials: true,

        // TODO:
        // response is empty and has no content-length and content-type headers
        // without this argument someone is trying to parse a response as XML and then throwing and error
        responseType: "blob",
    });
    dispatch(setAuthenticated(false));
}

export {login, logout, checkAuth};
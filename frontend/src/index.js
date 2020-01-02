import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RecordingsGrid from "./components/form/recordingGrid/RecordingsGrid";
import RecordingEditor from "./components/form/recordingEditor/RecordingEditor";
import Recording from "./components/form/recording/Recording";
import * as Redux from 'redux';
import axios from 'axios';
import {lectorium, SET_RECORDINGS, SET_PLAYLISTS, SET_USERS} from "./reducers";
import {connect, Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './routes';
import {Header} from "./components/header";
import {api_url} from "./constants";

// ReactDOM.render(<App />, document.getElementById('root'));


const store = Redux.createStore(lectorium,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


async function main() {
    const render = () => ReactDOM.render(
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

    store.subscribe(render);
    render();
}

main();

function UsersDisplay({users}) {
    console.dir(users);
    return (
        <ul>
            AA
            {users.allIds.map(id => <li key={id}>{users.byId[id].name}</li>)}
            BB
        </ul>
    )
}

UsersDisplay = connect(
    state => ({users: state.users})
)(UsersDisplay);



// ReactDOM.render(
//     <Provider store={store}>
//         <RecordingEditor/>
//     </Provider>,
//     document.getElementById("root")
// );
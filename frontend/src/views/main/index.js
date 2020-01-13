import React from 'react';
import logo from './logo.png';
import './main.css';
import {channel_url} from "../../constants";

function Main() {
    return (
        <div className="App App-container">
            <a className="App-link"
                href={channel_url}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={logo} className="App-logo" alt="logo"/>
            </a>
        </div>
    );
}

export {Main};

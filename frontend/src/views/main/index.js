import React from 'react';
import logo from './logo.png';
import './App.css';

function Main() {
    return (
        <div className="App App-container">
            <p>
                Watch out new videos!
            </p>
            <a
                className="App-link"
                href="https://www.youtube.com/channel/UCdxesVp6Fs7wLpnp1XKkvZg"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={logo} className="App-logo" alt="logo" />
                <br/>
                {/*Учение - свет*/}
            </a>
        </div>
    );
}

export {Main};

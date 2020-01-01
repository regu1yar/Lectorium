import React from 'react';
import logo from './logo.png';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Watch out new videos!
                </p>
                <a
                    className="App-link"
                    href="https://www.youtube.com/channel/UCdxesVp6Fs7wLpnp1XKkvZg"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Учение - свет
                </a>
            </header>
        </div>
    );
}

export default App;

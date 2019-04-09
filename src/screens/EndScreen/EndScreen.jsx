import React, { Component } from 'react';
import logo from '../../logo.svg';
import { NounouService } from '../../services/NounouService';
import './EndScreen.scss';


class App extends Component {
  componentDidMount() {
    const recap = NounouService.getRecap();
    console.log('TCL: App -> componentDidMount -> recap', recap);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            End Screen
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

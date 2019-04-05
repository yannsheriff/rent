
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../logo.svg';
import './PlayScreen.scss';


class PlayScreen extends Component {
  render() {
    console.log(this.props.mainState)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Play Screen 
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

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

  const mapStateToProps = state => ({
    mainState: state.mainReducer,
  });
  

  
  const componentContainer = connect(
    mapStateToProps,
  )(PlayScreen);
  
  export default componentContainer;


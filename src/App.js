import React, { Component } from 'react';

import './App.css';
import { connect } from 'react-redux';
import Setup from './screens/Setup/Setup'
import PlayScreen from './screens/PlayScreen/PlayScreen'
import EndScreen from './screens/EndScreen/EndScreen'
import { Route, Redirect } from "react-router"
import { BrowserRouter as Router } from "react-router-dom"

class App extends Component {
  render() {

    return (
      <Router className="app">
      <>
        <Route exact path="/" 
          render={() => ( <Redirect to="/setup"/> )}
        />

        <Route exact path="/setup" render={ () => 
          this.props.step.isSetUp ? (
            <Redirect to="/play"/>
          ) : 
          (<Setup />)
          }
        />  

        <Route exact path="/play" render={ () => 
          this.props.step.isSetUp ? (
            <PlayScreen />
          ) : (
            <Redirect to="/setup" />
          )}
        />   

        <Route exact path="/end" render={() => (<EndScreen />)}/>  
      </>
    </Router>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

  const mapStateToProps = state => ({
    step: state.stepReducer,
  });
  

  
  const componentContainer = connect(
    mapStateToProps,
  )(App);
  
  export default componentContainer;



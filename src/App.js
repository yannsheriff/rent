/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import './App.css';

import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Setup from './screens/Setup/Setup';
import PlayScreen from './screens/PlayScreen/PlayScreen';
import EndScreen from './screens/EndScreen/EndScreen';

function App(props) {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  const { isSetUp, gameIsOver } = props.step;
  return (
    <Router className="app">
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/setup" />} />

        <Route
          exact
          path="/setup"
          render={() => (isSetUp ? <Redirect to="/play" /> : <Setup />)
            }
        />

        <Route
          exact
          path="/play"
          render={() => {
            if (!gameIsOver) {
              return isSetUp ? <PlayScreen /> : <Redirect to="/setup" />;
            }
            return <EndScreen />;
          }
          }
        />

        <Route
          exact
          path="/end"
          render={() => (gameIsOver
            ? (<EndScreen />)
            : (<Redirect to="/setup" />)
          )
            }
        />
        <Redirect to="/setup" />
      </Switch>
    </Router>
  );
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  step: state.stepReducer,
});

const componentContainer = connect(mapStateToProps)(App);

export default componentContainer;

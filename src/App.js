/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import './App.css';

import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Setup from './screens/Setup/Setup';
import PlayScreen from './screens/PlayScreen/PlayScreen';
import EndScreen from './screens/EndScreen/EndScreen';
import DesktopHeader from './components/complexe/DesktopHeader/DesktopHeader';
import QRCode from './components/complexe/QRCode/QRCode';

function App(props) {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  const { isSetUp, gameIsOver } = props.step;

  return (
    <Router className="app">
      <div id="app-container">
        <DesktopHeader />
        <QRCode />
        <div id="app-wrapper">
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
        </div>
        {/* TEMPORAIRE */}
        <aside id="lmstp-description">
          <div>
            <strong>Loue-moi si tu peux !</strong> est un jeu satirique
            qui parodie la difficulté de se loger en grande agglomération.

            Élèves en Master Design et Management de l’Innovation Interactive à
            {' '}
            <a href="https://www.gobelins.fr/" rel="noopener noreferrer" target="_blank">Gobelins</a>
            , nous dénonçons les dérives et pratiques abusives qui sont courantes au sein de la location immobilière.

            <span>
              Un projet réalisé par
              {' '}
              <a href="https://www.gobelins.fr/" rel="noopener noreferrer" target="_blank">Audren</a>
              {', '}
              <a href="https://www.gobelins.fr/" rel="noopener noreferrer" target="_blank">Martin</a>
              {', '}
              <a href="https://www.gobelins.fr/" rel="noopener noreferrer" target="_blank">Noémie</a>
              {' & '}
              <a href="https://www.gobelins.fr/" rel="noopener noreferrer" target="_blank">Yann</a>
              .
            </span>
          </div>
        </aside>
      </div>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NounouService } from '../../services/NounouService';
import './EndScreen.scss';


class App extends Component {
  static propTypes = {
    step: PropTypes.object,
  };

  static defaultProps = {
    step: false,
  };

  componentDidMount() {
    const recap = NounouService.getRecap();
    console.log('TCL: App -> componentDidMount -> recap', recap);
  }

  render() {
    const { step } = this.props;
    console.log(this.recap);
    return (
      <div className="App">
        <h1>
          {step.end === 'win' ? 'Victoire !' : 'Défaite :(' }
        </h1>
        <div>
          <p><u>Recap :</u></p>
          POUR VIVRE DANS UN APPARTEMENT :
          <ul>
            <li />
          </ul>
        </div>
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  step: state.stepReducer,
});

const componentContainer = connect(mapStateToProps)(App);

export default componentContainer;

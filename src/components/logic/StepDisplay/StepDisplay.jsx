import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StepDisplay.scss';


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actualStep: 'annonces',
    };
  }

  //  ---- STEPS ----
  // - annonces
  // - visite
  // - peripethie
  // - skill
  // - remise en question
  // - event


  returnNextStep = (win) => {
    switch (this.state.actualStep) {
      case 'annonces':
        return win ? 'visite' : 'visite';

      case 'visite':
        return win ? 'peripethie' : 'annonces';

      case 'peripethie':
        return win ? 'skill' : 'question';

      case 'question':
        return win ? 'event' : 'event';

      case 'event':
        return win ? 'annonces' : 'annonces';

      default:
        return 'annonces';
    }
  }

  winStep = () => {
    const nextStep = this.returnNextStep(true);
    this.setState({ actualStep: nextStep });
  }

  failStep = () => {
    const nextStep = this.returnNextStep(false);
    this.setState({ actualStep: nextStep });
  }

  render() {
    // const actualStep = this.returnActualStep()

    return (
      <div id="steps">
        <h2>{this.state.actualStep}</h2>
        <button onClick={this.winStep}>Win</button>
        <button onClick={this.failStep}>loose</button>
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
)(Header);

export default componentContainer;

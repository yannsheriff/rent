import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StepDisplay.scss';

// components

import Ads from '../../complexe/Ads/Ads';
import Adventure from '../../complexe/Adventure/Adventure';
import Event from '../../complexe/Event/Event';
import Question from '../../complexe/Question/Question';
import Skill from '../../complexe/Skill/Skill';
import Visit from '../../complexe/Visit/Visit';


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


  returnActualComponent = () => {
    const childProps = { win: this.winStep, loose: this.failStep };

    switch (this.state.actualStep) {
      case 'annonces':
        return <Ads {...childProps} />;

      case 'visite':
        return <Visit {...childProps} />;

      case 'peripethie':
        return <Adventure {...childProps} />;

      case 'skill':
        return <Skill {...childProps} />;

      case 'question':
        return <Question {...childProps} />;

      case 'event':
        return <Event {...childProps} />;

      default:
        return <Ads {...childProps} />;
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
    const component = this.returnActualComponent();

    return (
      <div id="steps">
        {component}
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

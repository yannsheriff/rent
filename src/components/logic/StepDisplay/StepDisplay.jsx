import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StepDisplay.scss';
import EthanServices from '../../../services/EthanServices';

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
      actualStep: 'ads',
      round: 0,
    };
  }

  //  ---- STEPS ----
  // - ads
  // - visit
  // - peripethie
  // - skill
  // - reassessment
  // - event


  returnNextStep = (next) => {
    const { actualStep } = this.state;
    switch (actualStep) {
      case 'ads':
        return next ? 'visit' : 'visit';

      case 'visit':
        return next ? 'adventure' : 'ads';

      case 'adventure':
        return next ? 'skill' : 'reassessment';

      case 'reassessment':
        return next ? 'event' : 'event';

      case 'event':
        return next ? 'ads' : 'ads';

      default:
        return 'ads';
    }
  }


  returnActualComponent = () => {
    const { actualStep, round } = this.state;
    const childProps = { next: this.nextStep, fail: this.failStep, round };

    switch (actualStep) {
      case 'ads':
        return <Ads {...childProps} />;

      case 'visit':
        return <Visit {...childProps} />;

      case 'adventure':
        return <Adventure {...childProps} />;

      case 'skill':
        return <Skill {...childProps} />;

      case 'reassessment':
        return <Question {...childProps} />;

      case 'event':
        return <Event {...childProps} />;

      default:
        return <Ads {...childProps} />;
    }
  }

  nextStep = () => {
    const { round } = this.state;
    const nextStep = this.returnNextStep(true);
    const addRound = nextStep === 'ads' ? 1 : 0;

    this.setState({ actualStep: nextStep, round: round + addRound });
  }

  failStep = () => {
    const { round } = this.state;
    const nextStep = this.returnNextStep(false);
    const addRound = nextStep === 'ads' ? 1 : 0;

    this.setState({ actualStep: nextStep, round: round + addRound });
  }

  render() {
    const component = this.returnActualComponent();
    const { round } = this.state;

    return (

      <div id="steps">
        <p>{round}</p>
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

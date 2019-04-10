import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './StepDisplay.scss';
import { EthanService } from '../../../services/EthanServices';

// components

import Ads from '../../complexe/Ads/Ads';
import Adventure from '../../complexe/Adventure/Adventure';
import Event from '../../complexe/Event/Event';
import Question from '../../complexe/Question/Question';
import Skill from '../../complexe/Skill/Skill';
import Visit from '../../complexe/Visit/Visit';
import Reject from '../../complexe/Reject/Reject';

class Header extends Component {
  static propTypes = {
    profil: PropTypes.objectOf(PropTypes.object),
  };

  static defaultProps = {
    profil: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      actualStep: 'question',
      round: 0,
      data: this.getCardData('question'),
    };
  }

  //  ---- STEPS ----
  // - ads
  // - reject
  // - visit
  // - adventure
  // - skill
  // - question
  // - event


  getCardData = (step) => {
    const { profil } = this.props;
    const data = EthanService.get(step, profil);
    return data || this.state.data;
  }

  returnNextStep = (next) => {
    const { actualStep } = this.state;
    switch (actualStep) {
      case 'ads':
        return next ? 'visit' : 'visit';

      case 'visit':
        return next ? 'adventure' : 'reject';

      case 'adventure':
        return next ? 'skill' : 'question';

      case 'question':
        return next ? 'event' : 'event';

      case 'reject':
        return next ? 'ads' : 'ads';

      case 'event':
        return next ? 'ads' : 'ads';

      default:
        return 'ads';
    }
  }


  returnActualComponent = () => {
    const { actualStep, round, data } = this.state;
    const childProps = {
      next: this.nextStep,
      fail: this.failStep,
      round,
      data,
    };

    switch (actualStep) {
      case 'ads':
        return <Ads {...childProps} />;

      case 'visit':
        return <Visit {...childProps} />;

      case 'adventure':
        return <Adventure {...childProps} />;

      case 'skill':
        return <Skill {...childProps} />;

      case 'reject':
        return <Reject {...childProps} />;

      case 'question':
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
    const cardData = this.getCardData(nextStep);
    const addRound = nextStep === 'ads' ? 1 : 0;

    this.setState({ actualStep: nextStep, round: round + addRound, data: cardData });
  }

  failStep = () => {
    const { round } = this.state;
    const nextStep = this.returnNextStep(false);
    const cardData = this.getCardData(nextStep);
    const addRound = nextStep === 'ads' ? 1 : 0;

    this.setState({ actualStep: nextStep, round: round + addRound, data: cardData });
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
  profil: state.profilReducer,
});

const componentContainer = connect(
  mapStateToProps,
)(Header);

export default componentContainer;

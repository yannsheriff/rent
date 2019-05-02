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
      actualStep: 'ads',
      round: 0,
      data: this.getCardData('ads'),
      bgColor: '#90d5d0',
    };
  }

  //  ---- STEPS ----
  // - ads
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
        return next ? 'adventure' : 'ads';

      case 'adventure':
        return next ? 'skill' : 'question';

      case 'question':
        return next ? 'event' : 'event';

      case 'event':
        return next ? 'ads' : 'ads';

      default:
        return 'ads';
    }
  }

  returnBackgroundColor = (step) => {
    switch (step) {
      case 'ads':
        return '#90d5d0';

      case 'visit':
        return '#93da8a';

      case 'adventure':
        return '#ff9465';

      case 'question':
        return '#26a988';

      case 'skill':
        return '#ffac55';

      case 'event':
        return '#ffafaf';

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
    const bgColor = this.returnBackgroundColor(nextStep);
    const addRound = nextStep === 'ads' ? 1 : 0;

    this.setState({
      actualStep: nextStep, round: round + addRound, data: cardData, bgColor,
    });
  }

  failStep = () => {
    const { round } = this.state;
    const nextStep = this.returnNextStep(false);
    const cardData = this.getCardData(nextStep);
    const bgColor = this.returnBackgroundColor(nextStep);
    const addRound = nextStep === 'ads' ? 1 : 0;

    this.setState({
      actualStep: nextStep, round: round + addRound, data: cardData, bgColor,
    });
  }

  render() {
    const component = this.returnActualComponent();
    return (

      <div id="steps" style={{ backgroundColor: this.state.bgColor }}>
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

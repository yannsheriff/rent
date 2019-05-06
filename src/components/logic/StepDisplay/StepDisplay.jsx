import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './StepDisplay.scss';
import { CSSTransition } from 'react-transition-group';
import { EthanService } from '../../../services/EthanServices';

// components

import DataHandler from '../DataHandler/DataHandler';

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


  nextStep = () => {
    const { round } = this.state;
    const nextStep = this.returnNextStep(true);
    const bgColor = this.returnBackgroundColor(nextStep);
    const addRound = nextStep === 'ads' ? 1 : 0;

    this.setState({
      actualStep: nextStep,
      round: round + addRound,
      bgColor,
    });
  }

  failStep = () => {
    const { round } = this.state;
    const nextStep = this.returnNextStep(false);
    const bgColor = this.returnBackgroundColor(nextStep);
    const addRound = nextStep === 'ads' ? 1 : 0;

    this.setState({
      actualStep: nextStep,
      round: round + addRound,
      bgColor,
    });
  }

  render() {
    const {
      actualStep, bgColor, round,
    } = this.state;

    return (
      <div id="steps" style={{ backgroundColor: bgColor }}>
        <DataHandler step={actualStep} round={round} next={this.nextStep} fail={this.failStep} />

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

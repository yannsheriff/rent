import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './StepDisplay.scss';
import { changeStep } from 'redux/actions/steps';
import { getRandomArbitrary } from 'vendors/random';

// components

import DataHandler from '../DataHandler/DataHandler';

class StepDisplay extends Component {
  static propTypes = {
    changeStep: PropTypes.func,
    updateBackgroundColor: PropTypes.func,
  };

  static defaultProps = {
    changeStep: () => {},
    updateBackgroundColor: () => {},
  };

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
  // - adventure
  // - skill
  // - question
  // - event

  returnNextStep = (next) => {
    const { actualStep } = this.state;
    switch (actualStep) {
      case 'ads': {
        const isEvent = this.eventHappen();
        return next ? 'visit' : isEvent;
      }

      case 'visit': {
        const isEvent = this.eventHappen();
        return next ? 'adventure' : isEvent;
      }

      case 'adventure': {
        const isEvent = this.eventHappen();
        return next ? 'skill' : isEvent;
      }

      case 'question': {
        const isEvent = this.eventHappen();
        return next ? 'ads' : isEvent;
      }

      case 'event':
        return next ? 'ads' : 'ads';

      case 'skill':
        return next ? 'question' : 'question';

      default:
        return 'ads';
    }
  }

  nextStep = () => {
    const { round } = this.state;
    const nextStep = this.returnNextStep(true);
    const { changeStep } = this.props;
    changeStep(nextStep);
    const addRound = nextStep === 'ads' ? 1 : 0;

    this.setState({
      actualStep: nextStep,
      round: round + addRound,
    });
  }

  failStep = (needQuestion) => {
    const { round } = this.state;
    const { changeStep } = this.props;
    let nextStep = '';
    if (!needQuestion) {
      nextStep = this.returnNextStep(false);
    } else {
      nextStep = 'question';
    }
    changeStep(nextStep);
    const addRound = nextStep === 'ads' ? 1 : 0;

    this.setState({
      actualStep: nextStep,
      round: round + addRound,
    });
  }

  eventHappen = () => {
    const rand = getRandomArbitrary(0, 3);
    const fail = rand === 0 ? 'event' : 'ads';
    return fail;
  }

  render() {
    const {
      actualStep, round,
    } = this.state;
    return (
      <div id="steps" className="layout--steps">
        <DataHandler step={actualStep} round={round} next={this.nextStep} fail={this.failStep} />
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  globalStep: state.stepReducer,
});

const mapDispatchToProps = dispatch => ({
  changeStep: (e) => {
    dispatch(changeStep(e));
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepDisplay);

export default componentContainer;

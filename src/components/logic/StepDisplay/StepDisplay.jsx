import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './StepDisplay.scss';
import { changeStep } from 'redux/actions/steps';

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

  failStep = () => {
    const { round } = this.state;
    const nextStep = this.returnNextStep(false);
    const { changeStep } = this.props;
    changeStep(nextStep);
    const addRound = nextStep === 'ads' ? 1 : 0;

    this.setState({
      actualStep: nextStep,
      round: round + addRound,
    });
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

/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-expressions */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import './ProgressBar.scss';

class ProgressBar extends Component {
  static propTypes = {
    step: PropTypes.string,
  }

  static defaultProps = {
    step: '',
  }

  getStepPourcent = () => {
    const { step } = this.props;
    switch (step.step) {
      case 'question':
      case 'event':
      case 'ads':
        return 20; // %

      case 'visit':
      case 'transition transition--visit':
        return 40; // %

      case 'adventure':
      case 'transition transition--adventure':
        return 60; // %

      case 'skill':
        return 80; // %

      default:
        return null;
    }
  }

  render() {
    return (
      <div id="progress-bar">
        <div id="progress-bar--fill" style={{ width: `${this.getStepPourcent()}%` }} />
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

const componentContainer = connect(
  mapStateToProps,
)(ProgressBar);

export default componentContainer;

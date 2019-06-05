/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-expressions */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import lottie from 'lottie-web';
import './ProgressBar.scss';
import animations from 'assets/animation';

class ProgressBar extends Component {
  static propTypes = {
    step: PropTypes.string,
  }

  static defaultProps = {
    step: '',
  }

  constructor(props) {
    super(props);
    this.animationContainer = React.createRef();

    this.actualFrame = 31;
  }


  componentDidMount() {
    this.anim = lottie.loadAnimation({
      container: this.animationContainer.current, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: animations.jauge, // the path to the animation json
    });

    this.anim.goToAndStop(31, true);
    this.anim.setDirection(0);
  }

  getStepPourcent = () => {
    const { step } = this.props;
    switch (step.step) {
      case 'question':
      case 'event':
      case 'ads':
        if (this.anim) { this.anim.playSegments([this.actualFrame, 31]); }
        this.actualFrame = 31;
        return 0; // %

      case 'visit':
      case 'transition transition--visit':
        this.anim.playSegments([this.actualFrame, 15]);
        this.actualFrame = 15;
        return 25; // %

      case 'adventure':
      case 'transition transition--adventure':
        this.anim.playSegments([this.actualFrame, 10]);
        this.actualFrame = 10;
        return 50; // %

      case 'skill':
        this.anim.playSegments([this.actualFrame, 5]);
        this.actualFrame = 5;
        return 75; // %

      default:
        return null;
    }
  }

  render() {
    return (
      <div id="progress-bar">
        <div className="animation" ref={this.animationContainer} />
        <div className="progress-bar">
          <div className="progress-bar--fill" style={{ width: `${this.getStepPourcent()}%` }} />
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

const componentContainer = connect(
  mapStateToProps,
)(ProgressBar);

export default componentContainer;

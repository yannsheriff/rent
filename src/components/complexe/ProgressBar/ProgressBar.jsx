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
    this.actualFrame = 0;
    this.playAd = false;
    this.playVisit = false; // step 'visite' par 2 fois par la boucle
    this.playAdventure = false; // step 'adventure' par 2 fois par la boucle
  }


  componentWillMount() {}


  componentDidMount() {
    this.anim = lottie.loadAnimation({
      container: this.animationContainer.current, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: animations.jauge, // the path to the animation json
    });
    this.anim.setSpeed(1.5);
    this.anim.goToAndStop(0, true);
    this.anim.setDirection(0);
  }

  componentWillUnmount() {}

  getStepPourcent = () => {
    const { step } = this.props;
    switch (step.step) {
      // case 'transition transition--ads':
      case 'question':
      case 'event':
        if (this.anim) { this.anim.playSegments([this.actualFrame, 1], true); }
        this.actualFrame = 1;
        return 0; // %

      case 'ads':
      {
        if (this.playAd) {
          this.anim.playSegments([this.actualFrame, 0], true);
          this.actualFrame = 0;
          this.playAd = false;
        }
        return 0; // %
      }

      case 'visit': {
        if (this.playVisit) {
          this.anim.playSegments([this.actualFrame, 50], true);
          this.actualFrame = 50;
          this.playVisit = false;
          this.playAd = true;
          return 33; // %
        }
        this.playVisit = true;
        return 0; // %
      }

      case 'adventure':
      {
        if (this.playAdventure) {
          this.anim.playSegments([this.actualFrame, 100], true);
          this.actualFrame = 100;
          this.playAdventure = false;
          return 66; // %
        }
        this.playAdventure = true;
        return 33; // %
      }

      case 'skill win':
      {
        this.anim.playSegments([this.actualFrame, 100], true);
        this.actualFrame = 100;
        return 100; // %
      }

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

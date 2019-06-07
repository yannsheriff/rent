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
    this.counterVisit = 0; // step 'visite' par 2 fois par la boucle
    this.counterAdventure = 0; // step 'adventure' par 2 fois par la boucle
  }


  componentDidMount() {
    this.anim = lottie.loadAnimation({
      container: this.animationContainer.current, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: animations.jauge, // the path to the animation json
    });
    this.anim.goToAndStop(0, true);
    this.anim.setDirection(0);
  }

  getStepPourcent = () => {
    const { step } = this.props;
    switch (step.step) {
      case 'ads':
      case 'transition transition--ads':
        return 0;

      case 'question':
      case 'event':
        if (this.anim) { this.anim.playSegments([this.actualFrame, 1], true); }
        this.actualFrame = 1;
        return 0; // %

      case 'visit':
        if (this.counterVisit === 1) {
          this.anim.playSegments([this.actualFrame, 50], true);
          this.actualFrame = 50;
          this.counterVisit = 0;
        }
        this.counterVisit = 1;
        return 25; // %

      case 'adventure':
        if (this.counterAdventure === 1) {
          this.anim.playSegments([this.actualFrame, 100], true);
          this.actualFrame = 100;
          this.counterAdventure = 0;
        }
        this.counterAdventure = 1;
        return 50; // %

      case 'skill':
        this.anim.playSegments([this.actualFrame, 150], true);
        this.actualFrame = 150;
        return 75; // %

      case 'skill win':
        return 100; // %

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

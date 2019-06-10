/* eslint-disable no-unused-expressions */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hidePopUp } from 'redux/actions/steps';
import { CSSTransition } from 'react-transition-group';
import { MozartService } from 'services/MozartService';
import lottie from 'lottie-web';

/* LOTTIES */
import premiumOverlay from 'assets/animation/anim_premium_suscribe_overlay.json';

import Premium from './Premium/Premium';
import './PopUp.scss';

class PopUp extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    step: PropTypes.object,
    hide: PropTypes.func,
  }

  static defaultProps = {
    step: {},
    hide: () => {},
  }

  constructor(props) {
    super(props);
    this.state = { show: false, anim: false };
    this.animationStarsContainer = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ show: true }); }, 500);
    this.stars = lottie.loadAnimation({
      container: this.animationStarsContainer.current, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: premiumOverlay, // the path to the animation json
    });
  }

  hidePopUp = () => {
    const { hide } = this.props;
    hide();
  }

  playAnimationPremium = () => {
    this.setState({ anim: true }, () => {
      MozartService.interaction('premium');
      this.stars.play();
      this.stars.addEventListener('complete', () => {
        this.setState({ anim: false, show: false });
        this.hidePopUp();
      });
    });
  }

  returnPopUp() {
    const { step } = this.props;
    console.log(step);
    switch (step.popup) {
      case 'premium':
        return <Premium playAnimation={this.playAnimationPremium} hide={this.hidePopUp} />;
      default:
        return <Premium />;
    }
  }

  render() {
    const { show, anim } = this.state;
    const component = this.returnPopUp();
    return (
      <>
        <div id="popup" className={`${anim ? 'show' : 'hide'} animation-stars`} ref={this.animationStarsContainer} />
        <div id="premium--pop-up" className="fade">
          <CSSTransition in={show} timeout={500} classNames="trans-popup">
            <div className="premium--container">
              {component}
            </div>
          </CSSTransition>
        </div>
      </>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  step: state.stepReducer,
});

const mapDispatchToProps = dispatch => ({
  hide: () => {
    dispatch(hidePopUp());
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopUp);

export default componentContainer;

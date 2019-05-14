/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeStep } from 'redux/actions/steps';
import lottie from 'lottie-web';
import './Transition.scss';

/* ILLUSTRATIONS */

import animations from 'assets/animation';

import ads from 'assets/img/transition/transition.gif';
import visit from 'assets/img/transition/transition.gif';
import adventure from 'assets/img/transition/transition.gif';

class Transition extends Component {
  static propTypes = {
    data: PropTypes.string,
    changeStep: PropTypes.func,
  };

  static defaultProps = {
    data: '',
    changeStep: () => {},
  };

  constructor(props) {
    super(props);
    this.animationContainer = React.createRef();
  }

  componentDidMount() {
    lottie.loadAnimation({
      container: this.animationContainer.current, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animations.transition, // the path to the animation json
    });
  }

  componentWillUnmount() {
    const { changeStep, data } = this.props;
    changeStep(data);
  }

  getIllu() {
    const { data } = this.props;
    switch (data) {
      case 'ads':
        return ads;
      case 'visit':
        return visit;
      case 'adventure':
        return adventure;
      default:
        return null;
    }
  }

  render() {
    const { data } = this.props;
    const illu = this.getIllu();
    return (
      <div className="transition--card">
        {' '}
        <div className="transition--illu" ref={this.animationContainer} />
        {/* <img className="transition--illu" src={illu} alt="" /> */}
        <h1 className="card--title transition--title">
          {(data === 'visit') && 'Le coeur battant, vous vous rendez à la visite...'}
          {(data === 'adventure') && 'Dernier entretien, vous croisez les doigts'}
        </h1>
        {' '}
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
)(Transition);

export default componentContainer;

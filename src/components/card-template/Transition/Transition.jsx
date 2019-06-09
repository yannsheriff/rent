/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeStep } from 'redux/actions/steps';
import lottie from 'lottie-web';
import './Transition.scss';

/* LOTTIES */
import transitions from 'assets/animation/transition';

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
    const anim = this.getLottie();
    lottie.loadAnimation({
      container: this.animationContainer.current, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: anim, // the path to the animation json
    });

    const timeoutOnCard = new Promise(((resolve, reject) => {
      setTimeout(() => { resolve(true); }, 4000, false);
    }));

    const unmountPromise = new Promise((resolve) => {
      this.resolveUnmountPromise = resolve;
    });

    Promise.race([timeoutOnCard, unmountPromise]).then((next) => {
      if (next) {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.forceCardSwipe('left');
      }
    });
  }

  componentWillUnmount() {
    const { changeStep, data } = this.props;
    changeStep(data);
    this.resolveUnmountPromise(false);
  }

  getLottie = () => {
    const { data } = this.props;
    switch (data) {
      case 'ads':
        return transitions.transitionAds;
      case 'visit':
        return transitions.transitionVisit;
      case 'adventure':
        return transitions.transitionAdventure;
      default:
        return null;
    }
  }

  render() {
    const { data } = this.props;
    return (
      <div className="transition--card">
        {' '}
        <div className="transition--illu height--180" ref={this.animationContainer} />
        <h1 className="card--title transition--title">
          {(data === 'visit') && 'Le coeur battant, vous vous rendez à la visite...'}
          {(data === 'adventure') && 'Dernier entretien, vous croisez les doigts'}
          {(data === 'ads') && 'Allez, épluchons les annonces !'}
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

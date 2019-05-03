import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './StepDisplay.scss';
import { CSSTransition } from 'react-transition-group';
import { EthanService } from '../../../services/EthanServices';

// components

import Ads from '../../complexe/Ads/Ads';
import Adventure from '../../complexe/Adventure/Adventure';
import Event from '../../complexe/Event/Event';
import Question from '../../complexe/Question/Question';
import Skill from '../../complexe/Skill/Skill';
import Visit from '../../complexe/Visit/Visit';

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
      data: this.getCardData('ads'),
      bgColor: '#90d5d0',
      transition: false,
      show: true,
      cardIsRotate: false,
    };
  }

  //  ---- STEPS ----
  // - ads
  // - visit
  // - adventure
  // - skill
  // - question
  // - event


  componentDidMount() {
    setTimeout(() => { this.setState({ transition: true }); console.log('IP'); }, 300);
  }


  getCardData = (step) => {
    const { profil } = this.props;
    const data = EthanService.get(step, profil);
    return data || this.state.data;
  }

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


  returnActualComponent = () => {
    const { actualStep, round, data } = this.state;
    const childProps = {
      next: this.nextStep,
      fail: this.failStep,
      round,
      data,
    };

    switch (actualStep) {
      case 'ads':
        return <Ads {...childProps} />;

      case 'visit':
        return <Visit {...childProps} />;

      case 'adventure':
        return <Adventure {...childProps} />;

      case 'skill':
        return <Skill {...childProps} />;

      case 'question':
        return <Question {...childProps} />;

      case 'event':
        return <Event {...childProps} />;

      default:
        return <Ads {...childProps} />;
    }
  }

  nextStep = () => {
    const { round } = this.state;
    const nextStep = this.returnNextStep(true);
    const cardData = this.getCardData(nextStep);
    const bgColor = this.returnBackgroundColor(nextStep);
    const addRound = nextStep === 'ads' ? 1 : 0;

    this.setState({
      actualStep: nextStep,
      round: round + addRound,
      data: cardData,
      bgColor,
      show: false,
      transition: false,
      cardIsRotate: false,
    }, () => {
      this.setState({ show: true }, () => {
        setTimeout(() => { this.setState({ transition: true }); }, 800);
      });
    });
  }

  failStep = () => {
    const { round } = this.state;
    const nextStep = this.returnNextStep(false);
    const cardData = this.getCardData(nextStep);
    const bgColor = this.returnBackgroundColor(nextStep);
    const addRound = nextStep === 'ads' ? 1 : 0;

    this.setState({
      actualStep: nextStep,
      round: round + addRound,
      data: cardData,
      bgColor,
      show: false,
      transition: false,
      cardIsRotate: false,
    }, () => {
      this.setState({ show: true }, () => {
        setTimeout(() => { this.setState({ transition: true }); }, 800);
      });
    });
  }

  render() {
    const {
      bgColor, show, transition, cardIsRotate,
    } = this.state;
    const component = this.returnActualComponent();
    const style = cardIsRotate ? { transform: 'rotate(2deg)' } : { transform: 'rotate(0deg)' };

    return (
      <div id="steps" style={{ backgroundColor: bgColor }}>
        <div className="card-placeholder-container">
          <div className="card-placeholder" style={style} />
        </div>
        { show
        && (
        <CSSTransition in={transition} timeout={1000} classNames="trans-card" onEntered={() => this.setState({ cardIsRotate: true })}>
          <div className="card-container">
            {component}
          </div>
        </CSSTransition>
        )
        }

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

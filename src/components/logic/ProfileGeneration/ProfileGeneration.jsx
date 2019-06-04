/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ProfileGeneration.scss';
import { Wheel } from 'components/complexe';
import { MozartService } from 'services/MozartService';
import allstatus from 'assets/content/status';
import allorigins from 'assets/content/origins';
import allbudget from 'assets/content/budget';
import { Button } from 'components/basic';
import { TweenMax, Elastic } from 'gsap';
import { updateStatus, updateBudget, updateOrigin } from '../../../redux/actions/profil';

class ProfileGeneration extends Component {
  static propTypes = {
    updateStatus: PropTypes.func,
    updateBudget: PropTypes.func,
    updateOrigin: PropTypes.func,
    next: PropTypes.func,
  };

  static defaultProps = {
    updateStatus: () => {},
    updateBudget: () => {},
    updateOrigin: () => {},
    next: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      wheelIsTurning: true,
      allowClick: false,
      step: 'situation',
      title: '???',
    };
  }

  componentDidMount = () => {
    this.wheel.start();
    setTimeout(() => { this.wheel1.start(); }, 150);
    setTimeout(() => { this.wheel2.start(); }, 300);

    this.wheelSound = MozartService.loopSound('wheel');
    this.wheelSound.play();
  }

  stopWheel = () => {
    const { wheelIsTurning, allowClick } = this.state;
    const { next } = this.props;

    this.setState({ allowClick: false, wheelIsTurning: false });


    // premier click arrête la roue
    this.wheel.select();
    // MozartService.interaction('wheel1');
    // // console.log('TCL: slow ->  this.wheelSound', this.wheelSound._rate);
    // const slow = setInterval(() => {
    //   if (this.wheelSound._rate > 0.4) {
    //     this.wheelSound.rate(this.wheelSound._rate - 0.07);
    //   } else {
    //     this.wheelSound.stop();
    //     clearInterval(slow);
    //   }
    // }, 100);

    setTimeout(() => {
      this.wheel1.select();

      setTimeout(() => {
        this.wheel2.select();

        setTimeout(() => {
          this.setState({
            allowClick: true,
          });
        }, 500);
      }, 1500);
    }, 1500);
  }

  dataIsSelected = (data, step) => {
    const { updateStatus, updateOrigin, updateBudget } = this.props;
    switch (step) {
      case 'status':
        updateStatus(data);
        this.setState({ title: data.title }, () => { this.anime(); });
        break;
      case 'origin':
        updateOrigin(data);
        this.setState({ step: 'origine', title: data.title }, () => { this.anime(); });
        break;
      case 'budget':
        updateBudget(data);
        this.setState({ step: 'budget', title: data.title }, () => { this.anime(); });
        break;
      default:
        return '';
    }
  }

  anime = () => {
    document
      .querySelectorAll('.letter')
      .forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('show');
        }, index * 50 + 50);
      });
  }

  render() {
    const {
      step, wheelIsTurning, allowClick, title,
    } = this.state;
    const {
      next,
    } = this.props;
    const splited = title.split('').map((el, index) => (<span key={el + index} className={`letter ${el === ' ' ? 'blank' : ''}`}>{el}</span>));

    return (
      <div className="intro" onClick={allowClick ? next : () => {}}>
        <div className="profile-generation--container">
          <div className="profile-generation--title">
            <h1>Votre profil</h1>
          </div>

          <div className="wheel-container">
            <Wheel
              data={allstatus}
              fieldToShow="picto" // string or svg
              img="status" // if is img
              onDataSelection={(data) => { this.dataIsSelected(data, 'status'); }}
              onRef={(ref) => { this.wheel = ref; }}
            />
            <Wheel
              data={allorigins}
              fieldToShow="flag" // string or svg
              onDataSelection={data => this.dataIsSelected(data, 'origin')}
              onRef={(ref) => { this.wheel1 = ref; }}
            />
            <Wheel
              data={allbudget}
              fieldToShow="picto" // string or svg
              img="budget" // if is img
              onDataSelection={data => this.dataIsSelected(data, 'budget')}
              onRef={(ref) => { this.wheel2 = ref; }}
            />
          </div>
          {!wheelIsTurning
          && (
          <div className="profile-generation--status">
            <h2>{step}</h2>
            <span className="profile-generation--status-main">
              <h1>{splited}</h1>
            </span>
          </div>
          )}
          {wheelIsTurning && <Button onClick={this.stopWheel} text="arreter la roue" />}
        </div>
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({ profil: state.profilReducer });

const mapDispatchToProps = dispatch => ({
  updateStatus: (e) => {
    dispatch(updateStatus(e));
  },
  updateBudget: (e) => {
    dispatch(updateBudget(e));
  },
  updateOrigin: (e) => {
    dispatch(updateOrigin(e));
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileGeneration);

export default componentContainer;

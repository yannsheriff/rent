/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ProfileGeneration.scss';
import Wheel from 'components/basic/Wheel/Wheel';
import allstatus from 'assets/content/status';
import allorigins from 'assets/content/origins';
import allbudget from 'assets/content/budget';
import { updateStatus, updateBudget, updateOrigin } from '../../../redux/actions/profil';

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * ((max - 1) - min) + min);
}

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
      isStatus: false,
      isOrigin: false,
      isBudget: false,
      wheelIsTurning: true,
      wheelData: allstatus,
      step: 'status',
    };
  }

  componentDidMount = () => {
    this.wheel.start();
  }

  nextStep = () => {
    const { step, wheelIsTurning } = this.state;
    const { next } = this.props;

    // if (wheelIsTurning)

    // this.wheel.start();

    // premier click arrête la roue
    // if (wheelIsTurning) {
    // this.wheel.select();
    // setTimeout(() => {
    this.setState({ wheelIsTurning: false });
    // }, 5000);
    // } else {
    // deuxième click change la step et start la roue
    switch (step) {
      case 'status':
        this.setState({
          step: 'origin',
          wheelData: allorigins,
        });
        break;

      case 'origin':
        this.setState({
          step: 'budget',
          wheelData: allbudget,
        });
        break;

      case 'budget':
        this.setState({
          step: 'over',
          wheelData: allbudget,
        });
        break;

      default:
        return '';
    }
    // }

    // click final passe à l'écran d'après
    if (step === 'over') {
      next();
    }
  }

  dataIsSelected = (data) => {
    const { updateStatus, updateOrigin, updateBudget } = this.props;
    const { step } = this.state;
    // console.log(step);
    // console.log(data);
    // updateStatus(data);
    // switch (step) {
    //   case 'status':
    //     updateStatus(data);
    //     break;
    //   case 'origin':
    //     updateOrigin(data);
    //     break;
    //   case 'budget':
    //     updateBudget(data);
    //     break;
    //   default:
    //     return '';
    // }
  }

  render() {
    const {
      wheelData, step,
    } = this.state;
    const { profil } = this.props;
    const {
      budget, origin, status,
    } = profil;
    return (
      <div className="intro" onClick={() => this.nextStep()}>
        <div className="profile-generation--container">
          <h2>Votre profil</h2>
          <Wheel
            data={wheelData}
            fieldToShow={step === 'origin' ? 'flag' : 'picto'} // string or svg
            img={step !== 'origin'} // if is img
            onDataSelection={this.dataIsSelected}
            onRef={(ref) => { this.wheel = ref; }}
          />
          {/* <div className="profile-generation--container--item">
            {isStatus
            && (
            <>
              <p>Vous cherchez un appartement :</p>
              <h2>{ status.title }</h2>
            </>
            )
          }
          </div>
          <div className="profile-generation--container--item">
            {isOrigin
            && (
            <>
              <p>Vous êtes d'origine :</p>
              <h2>
                { origin.title }
                {' '}
                {' '}
                {' '}
                { origin.flag }
              </h2>
            </>
            )
          }
          </div>
          <div className="profile-generation--container--item">
            {isBudget
            && (
            <>
              <p>Vous avez un budget :</p>
              <h2>{ budget.title }</h2>
            </>
            )
          }
          </div>
          {(isStatus && isOrigin && isBudget)
            && (
            <p className="intro--info">Toucher pour continuer</p>
            )
        } */}
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

/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ProfileGeneration.scss';
import Wheel from 'components/basic/Wheel/Wheel';
import origins from 'assets/content/origins';
import allstatus from 'assets/content/status';
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
      wheelData: origins,
      field: 'illu',
    };
  }

  componentDidMount() {
    // this.generateAll();
  }

  // generateAll = () => {
  //   setTimeout(() => { this.generateStatus(); }, 100);
  //   setTimeout(() => { this.generateOrigin(); }, 100);
  //   setTimeout(() => { this.generateBudget(); }, 100);
  // }

  // generateStatus = () => {
  //   const { updateStatus } = this.props;
  //   const statusArray = ['single', 'couple', 'collocation'];
  //   const rand = getRandomArbitrary(0, statusArray.length);
  //   updateStatus(statusArray[rand]);
  //   this.setState({ isStatus: true });
  // }

  // generateOrigin = () => {
  //   const { updateOrigin } = this.props;
  //   const originArray = ['frfr', 'frjp', 'frmc'];
  //   const rand = getRandomArbitrary(0, originArray.length);
  //   updateOrigin(originArray[rand]);
  //   this.setState({ isOrigin: true });
  // }

  // generateBudget = () => {
  //   const { updateBudget } = this.props;
  //   const budgetArray = ['poor', 'regular', 'rich'];
  //   const rand = getRandomArbitrary(0, budgetArray.length);
  //   updateBudget(budgetArray[rand]);
  //   this.setState({ isBudget: true });
  // }

  nextStep = () => {
    // const { isStatus, isBudget, isOrigin } = this.state;
    // const { next } = this.props;
    // if (isStatus && isOrigin && isBudget) {
    //   next();
    // }

    this.wheel.select();
    setTimeout(() => {
      this.setState({ wheelData: allstatus, field: 'picto' });
    }, 5000);
  }

  dataIsSelected = (data) => {
    console.log(data);
  }

  render() {
    const {
      isStatus, isBudget, isOrigin, wheelData, field,
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
            fieldToShow={field}
            onDataSelection={this.dataIsSelected}
            onRef={(ref) => { this.wheel = ref; }}
            img={field === 'picto'} // if is img
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

/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStatus, updateBudget, updateOrigin } from '../../../redux/actions/profil';
import './ProfileGeneration.scss';


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
    };
  }

  generateStatus = () => {
    const { updateStatus } = this.props;
    const statusArray = ['single', 'couple', 'collocation'];
    const rand = getRandomArbitrary(0, statusArray.length);
    updateStatus(statusArray[rand]);
  }

  generateOrigin = () => {
    const { updateOrigin } = this.props;
    const originArray = ['frfr', 'frjp', 'frmc'];
    const rand = getRandomArbitrary(0, originArray.length);
    updateOrigin(originArray[rand]);
  }

  generateBudget = () => {
    const { updateBudget, next } = this.props;
    const budgetArray = ['poor', 'regular', 'rich'];
    const rand = getRandomArbitrary(0, budgetArray.length);
    updateBudget(budgetArray[rand]);
    setTimeout(() => { next(); }, 1000);
  }

  render() {
    const { profil } = this.props;
    const {
      budget, origin, status,
    } = profil;
    return (
      <div id="profileGeneration">
        <p>Profile Generation</p>
        <button type="button" onClick={() => this.generateStatus()}>
          Generate status
        </button>
        {' '}
        <br />
        <button type="button" onClick={() => this.generateOrigin()}>
          Generate origin
        </button>
        {' '}
        <br />
        <button type="button" onClick={() => this.generateBudget()}>
          Generate budget
        </button>

        <h1>{ status.title }</h1>
        <h1>
          { origin.title }
          {' '}
          {' '}
          {' '}
          { origin.flag }
        </h1>
        <h1>{ budget.title }</h1>
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

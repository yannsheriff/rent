/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ProfileRecap.scss';

class ProfileRecap extends Component {
  static propTypes = {
    next: PropTypes.func,
  };

  static defaultProps = {
    next: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      canNext: false,
    };
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ canNext: true }); }, 100);
  }

  nextStep = () => {
    const { canNext } = this.state;
    const { next } = this.props;
    if (canNext) {
      next();
    }
  }

  render() {
    const { canNext } = this.state;
    const { profil } = this.props;
    const {
      budget, origin, status, score, skills,
    } = profil;
    const lowercase = {
      textTransform: 'lowercase',
    };

    return (
      <div className="profile-recap" onClick={() => this.nextStep()}>
        <div className="profile-recap--container">
          <h1>
            Vous cherchez un logement
            {' '}
            <span className="lowercase">
              { status.title }
              ,
            </span>
            {' '}
            êtes d'origine
            {' '}
            { origin.title }
            {' '}
            avec un budget
            {' '}
            { budget.title }
            {'.'}
          </h1>
        </div>

        <div className="profile-recap--rate" />

        {canNext
            && (
            <p className="intro--info">Toucher pour continuer</p>
            )
        }
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({ profil: state.profilReducer });

const componentContainer = connect(
  mapStateToProps,
)(ProfileRecap);

export default componentContainer;

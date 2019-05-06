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
    setTimeout(() => { this.setState({ canNext: true }); }, 1000);
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
    const { profil, next } = this.props;
    const {
      budget, origin, status, score, skills,
    } = profil;
    const lowercase = {
      textTransform: 'lowercase',
    };

    return (
      <div id="profile-recap" className="main-layout" onClick={() => this.nextStep()}>
        <p>Votre profil</p>
        <h3>{ status.title }</h3>
        <h3>{ budget.title }</h3>
        <h3 style={lowercase}>
          origine
          {' '}
          { origin.title }
        </h3>

        <br />

        <h3>{ skills[0].title }</h3>
        <h3>{ skills[1].title }</h3>

        <p>Votre dossier a une note de :</p>

        <h1>{ score }</h1>

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

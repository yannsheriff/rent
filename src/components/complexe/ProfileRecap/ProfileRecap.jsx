/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileRecap.scss';

class ProfileRecap extends Component {
  render() {
    const { profil, next } = this.props;
    const {
      budget, origin, status, score, skills,
    } = profil;
    const lowercase = {
      textTransform: 'lowercase',
    };

    return (
      <div id="profileRecap">
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

        <a onClick={() => next()}>
            Super, c'est parti
        </a>
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

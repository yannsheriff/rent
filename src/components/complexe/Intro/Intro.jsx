/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import rentBanner from 'assets/img/rent-banner.png';
import './Intro.scss';

class Intro extends Component {
  render() {
    const { next } = this.props;
    return (
      <div id="intro" className="intro" onClick={() => next()}>
        <img className="intro--banner" src={rentBanner} alt="rent-banner" />
        <h1>LOUE MOI SI TU PEUX</h1>
        <p>
          Vous avez 3 mois pour trouver un appartement.
          {' '}
          <br />
          Saurez vous faire les bons choix pour ne pas finir à la rue (ou pire) ?
          {' '}
        </p>
        <p className="intro--info">Toucher pour continuer</p>
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({ mainState: state.mainReducer });

const componentContainer = connect(
  mapStateToProps,
)(Intro);

export default componentContainer;

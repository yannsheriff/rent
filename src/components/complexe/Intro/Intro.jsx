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
      <div id="intro" className="intro">
        <div className="header">
          <div className="menu" />
        </div>
        <div className="content">

          <div>

            <img className="intro--banner" src={rentBanner} alt="rent-banner" />
            <h1>Loue moi si tu peux !</h1>
            <p>
          Vous avez 6 mois pour trouver un appartement à Paris !
          Saurez-vous faire les bons choix pour ne pas finir à la rue ?
          Encore une ligne, allez !
            </p>
          </div>
          <button className="btn" onClick={() => next()}> Relever le défi </button>
        </div>
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

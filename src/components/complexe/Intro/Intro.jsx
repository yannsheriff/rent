/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lmstpBanner from 'assets/img/intro.gif';
import { Button } from 'components/basic';
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

            <img className="intro--banner" src={lmstpBanner} alt="loue moi si tu peux home" />
            <h1>
              Loue-moi
              {' '}
              <br />
              si tu peux !
            </h1>
            <h2>
            Louer un appartement en ville peut être un véritable parcours du combattant. Saurez-vous faire les bons choix pour ne pas finir à la rue ?
            </h2>
          </div>
          <Button onClick={() => next()} text="Relever le défi" />
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

/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Profile.scss';
import star from 'assets/img/icons/icon_star.svg';

class Header extends Component {
  static propTypes = {
    profil: PropTypes.object,
  };

  static defaultProps = {
    profil: {},
  };

  render() {
    const { profil } = this.props;
    const {
      budget, origin, status, score,
    } = profil;

    return (
      <div id="profile" className="layout--profile">
        <div className="score">
          <img src={star} />
          <p>{score}</p>
        </div>
        <div>
          <img src={status.picto} />
        </div>
        <div>
          <div className="origin">
            <p>{origin.flag}</p>
          </div>
        </div>
        <div>
          <img src={budget.picto} />
        </div>
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  profil: state.profilReducer,
});

const componentContainer = connect(mapStateToProps)(Header);

export default componentContainer;

/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Profile.scss';

class Header extends Component {
  static propTypes = {
    profil: PropTypes.objectOf(PropTypes.object),
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
        <p>{score}</p>
        <p>{budget.title}</p>
        <p>{origin.flag}</p>
        <p>{status.title}</p>
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

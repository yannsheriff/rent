/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ProfilGeneration.scss';

class ProfilGeneration extends Component {
  render() {
    const { next } = this.props;
    return (
      <div id="profilGeneration">
        <p>ProfilGeneration</p>
        <a onClick={() => next()}>
            next
        </a>
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
)(ProfilGeneration);

export default componentContainer;

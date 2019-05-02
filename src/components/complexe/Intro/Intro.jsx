/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Intro.scss';

class Intro extends Component {
  render() {
    const { next } = this.props;
    return (
      <div id="intro" onClick={() => next()}>
        <h1>Rent</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue eget arcu dictum varius. Purus in massa tempor nec feugiat nisl pretium fusce. Elit duis tristique sollicitudin nibh sit amet commodo.</p>
        <p className="info">Toucher pour continuer</p>
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

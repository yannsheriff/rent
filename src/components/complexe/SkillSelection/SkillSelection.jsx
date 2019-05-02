/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './SkillSelection.scss';

class SkillSelection extends Component {
  render() {
    const { next } = this.props;
    return (
      <div id="skillSelection">
        <p>skillSelection </p>
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
)(SkillSelection);

export default componentContainer;

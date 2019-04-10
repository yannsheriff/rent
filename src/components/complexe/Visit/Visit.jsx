/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStatus, updateBudget, updateOrigin } from '../../../redux/actions/profil';
import './Visit.scss';


class Visit extends Component {
  static propTypes = {
    updateStatus: PropTypes.func,
    updateBudget: PropTypes.func,
    updateOrigin: PropTypes.func,
    fail: PropTypes.func,
    next: PropTypes.func,
    round: PropTypes.number,
  };

  static defaultProps = {
    updateStatus: () => {},
    updateBudget: () => {},
    updateOrigin: () => {},
    fail: () => {},
    next: () => {},
    round: 0,
  };

  render() {
    const {
      updateStatus, updateBudget, updateOrigin, fail, next, round,
    } = this.props;
    return (
      <div id="visit">
        <p>Visit</p>
        <button type="button" onClick={fail}>fail</button>
        { round > 0
        && <button type="button" onClick={next}>next</button> }
        <br />
        <button type="button" onClick={() => updateStatus('couple')}>couple</button>
        <button type="button" onClick={() => updateStatus('single')}>seul</button>
        <button type="button" onClick={() => updateBudget('cheap')}>pauvre</button>
        <button type="button" onClick={() => updateBudget('expensive')}>riche</button>
        <button type="button" onClick={() => updateOrigin('frfr')}>blanc</button>
        <button type="button" onClick={() => updateOrigin('frjp')}>asiat</button>
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({ mainState: state.mainReducer });

const mapDispatchToProps = dispatch => ({
  updateStatus: (e) => {
    dispatch(updateStatus(e));
  },
  updateBudget: (e) => {
    dispatch(updateBudget(e));
  },
  updateOrigin: (e) => {
    dispatch(updateOrigin(e));
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Visit);

export default componentContainer;

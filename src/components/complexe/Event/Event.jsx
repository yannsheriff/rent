/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import './Event.scss';
import {
  updateStatus, updateBudget, updateOrigin, updateScore,
} from '../../../redux/actions/profil';

class Event extends Component {
  static propTypes = {
    updateStatus: PropTypes.func,
    updateBudget: PropTypes.func,
    updateOrigin: PropTypes.func,
    updateScore: PropTypes.func,
    next: PropTypes.func,
    data: PropTypes.object,
  };

  static defaultProps = {
    updateStatus: () => {},
    updateBudget: () => {},
    updateOrigin: () => {},
    updateScore: () => {},
    next: () => {},
    data: {},
  };

  componentDidMount() {
    const {
      data, updateScore, updateStatus, updateBudget, updateOrigin,
    } = this.props;

    if (data.pointsAjouterRetirer) {
      updateScore(data.pointsAjouterRetirer);
    }
    if (data.event_new_status) {
      updateStatus(data.event_new_status);
    }
    if (data.event_new_budget) {
      updateBudget(data.event_new_budget);
    }
    if (data.event_new_origin) {
      updateOrigin(data.event_new_origin);
    }
  }

  render() {
    const { next, data } = this.props;

    return (
      <div id="event">
        <p>Event</p>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.event_narration) }} />
        <button type="button" onClick={next}>{ data.event_choice }</button>
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
  updateScore: (e) => {
    dispatch(updateScore(e));
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Event);

export default componentContainer;

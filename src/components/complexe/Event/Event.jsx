/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import './Event.scss';
import { updateStatus, updateBudget, updateOrigin } from '../../../redux/actions/profil';

class Event extends Component {
  static propTypes = {
    updateStatus: PropTypes.func,
    updateBudget: PropTypes.func,
    updateOrigin: PropTypes.func,
    fail: PropTypes.func,
    next: PropTypes.func,
    data: PropTypes.object,
  };

  static defaultProps = {
    updateStatus: () => {},
    updateBudget: () => {},
    updateOrigin: () => {},
    fail: () => {},
    next: () => {},
    data: {},
  };

  render() {
    const {
      updateStatus, updateBudget, updateOrigin, fail, next, data,
    } = this.props;
    console.log(data);
    return (
      <div id="event">
        <p>Event</p>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.event_narration) }} />
        <button type="button" onClick={next}>{ data.event_choice }</button>
        <br />
        <button type="button" onClick={() => updateStatus('couple')}>couple</button>
        <button type="button" onClick={() => updateStatus('single')}>seul</button>
        <button type="button" onClick={() => updateBudget('poor')}>pauvre</button>
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

const mapStateToProps = state => ({
  status: state.status,
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
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Event);

export default componentContainer;

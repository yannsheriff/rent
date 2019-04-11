/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Card from '../../basic/Card/Card';
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
      updateStatus, updateBudget, updateOrigin, next, data,
    } = this.props;
    return (
      <div id="event">
        <p>Event</p>
        <div className="event">
          <Card swipLeft={next} swipRight={next}>
            <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.event_narration) }} />
          </Card>
        </div>
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

/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Reject.scss';


class Reject extends Component {
  static propTypes = {
    data: PropTypes.object,
    next: PropTypes.func,
  };

  static defaultProps = {
    data: {},
    next: () => {},
  };

  render() {
    const {
      next, data,
    } = this.props;
    return (
      <div id="reject">
        <p>Reject</p>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.reject_narration) }} />
        <button onClick={next}>next</button>
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  mainState: state.mainReducer,
});


const componentContainer = connect(
  mapStateToProps,
)(Reject);

export default componentContainer;

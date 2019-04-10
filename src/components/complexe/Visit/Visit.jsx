/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { connect } from 'react-redux';
import './Visit.scss';


class Visit extends Component {
  static propTypes = {
    data: PropTypes.object,
    fail: PropTypes.func,
    next: PropTypes.func,
    round: PropTypes.number,
  };

  static defaultProps = {
    data: {},
    fail: () => {},
    next: () => {},
    round: 0,
  };

  render() {
    const {
      fail, next, round, data,
    } = this.props;
    return (
      <div id="visit">
        <p>Visit</p>
        { data.visit_quality }
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.visit_description) }} />
        <p>
          La visite passe par
          { data.visit_source }
        </p>
        <button type="button" onClick={fail}>fail</button>
        { round > 0
        && <button type="button" onClick={next}>next</button> }
        <br />
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
)(Visit);

export default componentContainer;

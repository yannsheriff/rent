/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { connect } from 'react-redux';
import Card from '../../basic/Card/Card';
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

  constructor(props) {
    super(props);
    this.state = {
      haveNextCard: false,
      nextCard: undefined,
    };
  }


  render() {
    const { data } = this.props;
    return (
      <div id="visit">
        <h1>{ data.visit.visit_quality }</h1>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.visit.visit_description) }} />
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

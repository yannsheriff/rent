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

  render() {
    const {
      fail, next, round, data,
    } = this.props;
    return (
      <div id="visit">
        <p>visite</p>
        <div className="visit">
          <Card swipLeft={fail} swipRight={() => (round > 0 ? next() : fail())}>
            { data.visit_quality }
            <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.visit_description) }} />
            <p>
          La visite passe par
              { data.visit_source }
            </p>
          </Card>
        </div>
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

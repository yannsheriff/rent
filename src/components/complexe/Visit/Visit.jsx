/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { connect } from 'react-redux';
import Card from '../../basic/Card/Card';
import './Visit.scss';


function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * ((max - 1) - min) + min);
}


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

  isFileRejected = () => {
    const {
      next, round, data, fail,
    } = this.props;
    const rand = getRandomArbitrary(0, 10);
    if (round === 0 || rand === 0) {
      const card = (
        <Card swipLeft={fail} swipRight={fail}>
          <div dangerouslySetInnerHTML={
            { __html: documentToHtmlString(data.reject.reject_narration) }
            }
          />
        </Card>
      );
      this.setState({ haveNextCard: true, nextCard: card });
    } else {
      next();
    }
  }

  render() {
    const { fail, data } = this.props;
    const { haveNextCard, nextCard } = this.state;
    return (
      <div id="visit">
        <p>visite</p>
        <div className="visit">
          <Card swipLeft={fail} swipRight={this.isFileRejected}>
            <h1>{ data.visit.visit_quality }</h1>
            <div dangerouslySetInnerHTML={
              { __html: documentToHtmlString(data.visit.visit_description) }
              }
            />
          </Card>
          {haveNextCard && nextCard}
          <Card>
            <h1>Annonces</h1>
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

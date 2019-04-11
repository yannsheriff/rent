/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Card from '../../basic/Card/Card';
import './Question.scss';
import { updateStatus, updateBudget, updateOrigin } from '../../../redux/actions/profil';

class Question extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      haveNextCard: false,
      nextCard: undefined,
    };
  }

  returnNextCard = (choice) => {
    const { data, next } = this.props;
    const content = choice ? data.question_accept_narration : data.question_refuse_narration;
    const card = (
      <Card swipLeft={next} swipRight={next}>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(content) }} />
      </Card>
    );
    this.setState({ haveNextCard: true, nextCard: card });
  }

  render() {
    const { fail, next, data } = this.props;
    const { haveNextCard, nextCard } = this.state;

    return (
      <div id="question">
        <p>Question</p>
        <div className="question">
          <Card swipLeft={() => this.returnNextCard(1)} swipRight={() => this.returnNextCard(1)}>
            <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.question_narration) }} />
          </Card>
          {haveNextCard && nextCard}
        </div>
        {!haveNextCard && (
          <div className="choices">
            <button type="button" onClick={fail}>{ data.question_accept }</button>
            <button type="button" onClick={next}>{ data.question_refuse }</button>
          </div>
        )}
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
)(Question);

export default componentContainer;

/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Card from '../../basic/Card/Card';
import './Question.scss';
import {
  updateStatus, updateBudget, updateOrigin, updateScore,
} from '../../../redux/actions/profil';

class Question extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      haveNextCard: false,
      nextCard: undefined,
    };
  }

  updateProfile = () => {
    const {
      data, updateScore, updateStatus, updateBudget, updateOrigin,
    } = this.props;

    if (data.question_new_points) {
      updateScore(data.question_new_points);
    }
    if (data.question_new_status) {
      updateStatus(data.question_new_status);
    }
    if (data.question_new_budget) {
      updateBudget(data.question_new_budget);
    }
    if (data.question_new_origin) {
      updateOrigin(data.question_new_origin);
    }
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
    const { data } = this.props;
    return (
      <div id="question">
        <div
          dangerouslySetInnerHTML={
                { __html: documentToHtmlString(data.question_narration) }
              }
        />
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
)(Question);

export default componentContainer;

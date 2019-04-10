/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

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

  state = {
    accept: false,
    refuse: false,
  }

  render() {
    const {
      updateStatus, updateBudget, updateOrigin, fail, next, data,
    } = this.props;
    const {
      accept, refuse,
    } = this.state;
    console.log(data);
    return (
      <div id="question">
        <p>Question</p>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.question_narration) }} />
        <button type="button" onClick={() => { this.setState({ accept: true }); }}>{ data.question_accept }</button>
        <button type="button" onClick={() => { this.setState({ refuse: true }); }}>{ data.question_refuse }</button>
        <br />
        {
          accept
          && <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.question_accept_narration) }} />
        }
        {
          refuse
          && <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.question_refuse_narration) }} />
        }
        { (accept || refuse)
          && (
          <>
            <button type="button" onClick={next}>next</button>
          </>
          )
        }

        {/* <button type="button" onClick={() => updateStatus('couple')}>couple</button>
        <button type="button" onClick={() => updateStatus('single')}>seul</button>
        <button type="button" onClick={() => updateBudget('cheap')}>pauvre</button>
        <button type="button" onClick={() => updateBudget('expensive')}>riche</button>
        <button type="button" onClick={() => updateOrigin('frfr')}>blanc</button>
        <button type="button" onClick={() => updateOrigin('frjp')}>asiat</button> */}
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

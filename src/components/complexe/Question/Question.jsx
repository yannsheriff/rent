import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Question.scss';


class Question extends Component {
  render() {
    return (
      <div id="question">
        <p>Question</p>
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
)(Question);

export default componentContainer;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Question.scss';


class Question extends Component {
  render() {
    return (
      <div id="question">
        <p>Question</p>
        <button onClick={this.props.win}>Win</button>
        <button onClick={this.props.loose}>loose</button>
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

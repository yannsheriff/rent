import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Adventure.scss';


class Adventure extends Component {
  render() {
    return (
      <div id="adventure">
        <p>Adventure</p>
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
)(Adventure);

export default componentContainer;

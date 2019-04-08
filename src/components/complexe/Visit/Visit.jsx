
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Visit.scss';


class Visit extends Component {
  render() {
    return (
      <div id="visit">
        <p>Visit</p>
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
)(Visit);

export default componentContainer;


import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Visit.scss';


class Visit extends Component {
  render() {
    return (
      <div id="visit">
        <p>Visit</p>
        <button onClick={this.props.next}>next</button>
        <button onClick={this.props.fail}>fail</button>
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

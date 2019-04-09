import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Reject.scss';


class Reject extends Component {
  render() {
    return (
      <div id="reject">
        <p>Reject</p>
        <button onClick={this.props.next}>next</button>
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
)(Reject);

export default componentContainer;

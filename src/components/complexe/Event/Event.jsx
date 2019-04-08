import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Event.scss';


class Event extends Component {
  render() {
    return (
      <div id="event">
        <p>Event</p>
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
)(Event);

export default componentContainer;

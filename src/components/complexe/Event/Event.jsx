import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Event.scss';


class Event extends Component {
  render() {
    return (
      <div id="event">
        <p>Event</p>
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
  status: state.status,
});

const componentContainer = connect(
  mapStateToProps,
)(Event);

export default componentContainer;

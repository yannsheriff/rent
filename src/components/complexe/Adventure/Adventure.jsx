import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Adventure.scss';


class Adventure extends Component {
  render() {
    return (
      <div id="adventure">
        <p>Adventure</p>
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
)(Adventure);

export default componentContainer;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Adventure.scss';


class Adventure extends Component {
  render() {
    return (
      <div id="adventure">
        <p>Adventure</p>
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

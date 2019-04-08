
import React, { Component } from './node_modules/react';
import { connect } from './node_modules/react-redux';
import './Visit.scss';


class Visit extends Component {
  render() {
    return (
      <div id="visit">
        <p>Visit</p>
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

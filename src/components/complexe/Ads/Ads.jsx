import React, { Component } from './node_modules/react';
import { connect } from './node_modules/react-redux';
import './Ads.scss';


class Ads extends Component {
  render() {
    return (
      <div id="ads">
        <p>Ads</p>
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
)(Ads);

export default componentContainer;

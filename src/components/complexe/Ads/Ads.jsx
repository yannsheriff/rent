import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Ads.scss';


class Ads extends Component {
  render() {
    return (
      <div id="ads">
        <p>Ads</p>
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
)(Ads);

export default componentContainer;

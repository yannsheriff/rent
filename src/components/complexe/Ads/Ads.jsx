import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NounouService } from '../../../services/NounouService';
import './Ads.scss';


class Ads extends Component {
  visitFlat = () => {
    const { next } = this.props;
    NounouService.newAd({});
    next();
  }

  render() {
    return (
      <div id="ads">
        <p>Ads</p>
        <button onClick={this.visitFlat}>next</button>
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

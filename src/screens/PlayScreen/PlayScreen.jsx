
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlayScreen.scss';

// components
import Header from '../../components/logic/Header/Header';
import Profile from '../../components/logic/Profile/Profile';
import StepDisplay from '../../components/logic/StepDisplay/StepDisplay';


class PlayScreen extends Component {
  render() {
    return (
      <div className="App main-layout">
        <Header />
        <StepDisplay />
        <Profile />
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
)(PlayScreen);

export default componentContainer;

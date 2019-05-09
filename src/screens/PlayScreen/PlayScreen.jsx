
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlayScreen.scss';

// components
import Header from 'components/logic/Header/Header';
import Profile from 'components/logic/Profile/Profile';
import StepDisplay from 'components/logic/StepDisplay/StepDisplay';
import PopUp from 'components/complexe/PopUp/PopUp';

class PlayScreen extends Component {
  render() {
    const { step } = this.props;

    return (
      <div className={`App main-layout ${step.step} fade`}>
        <Header />
        <StepDisplay />
        <Profile />
        { step.popup && <PopUp />}
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  step: state.stepReducer,
});

const componentContainer = connect(
  mapStateToProps,
)(PlayScreen);

export default componentContainer;

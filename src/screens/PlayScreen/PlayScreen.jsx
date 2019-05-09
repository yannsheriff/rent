
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlayScreen.scss';

// components
import Header from 'components/logic/Header/Header';
import Profile from 'components/logic/Profile/Profile';
import StepDisplay from 'components/logic/StepDisplay/StepDisplay';

class PlayScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { step } = this.props;

    return (
      <div className={`App main-layout ${step.step} fade`}>
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
  step: state.stepReducer,
});

const componentContainer = connect(
  mapStateToProps,
)(PlayScreen);

export default componentContainer;

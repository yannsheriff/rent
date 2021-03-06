
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { MozartService } from 'services/MozartService';
import Fade from '@material-ui/core/Fade';
import './PlayScreen.scss';

// components
import Header from 'components/logic/Header/Header';
import Profile from 'components/logic/Profile/Profile';
import StepDisplay from 'components/logic/StepDisplay/StepDisplay';
import PopUp from 'components/complexe/PopUp/PopUp';

class PlayScreen extends PureComponent {
  componentDidMount() {
    MozartService.playMainSound();
  }

  componentWillUnmount() {
    MozartService.stopMainSound();
  }

  render() {
    const { step } = this.props;
    return (
      <div className={`App main-layout ${step.step} fade`}>
        <Header />
        <StepDisplay />
        <Profile />
        { step.popup
        && (
        <Fade>
          <PopUp />
        </Fade>
        )
          }
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

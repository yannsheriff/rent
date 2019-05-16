import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gameIsSetUp } from 'redux/actions/steps';
import {
  ProfileGeneration,
} from 'components/logic';
import {
  Intro, SkillSelection, ProfileRecap, Menu,
} from 'components/complexe';
import './Setup.scss';

class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 'intro',
    };
  }

  goToNextStep = () => {
    const { step } = this.state;
    const { didSetUp } = this.props;

    switch (step) {
      case 'intro':
        this.setState({ step: 'profil' });
        break;
      case 'profil':
        this.setState({ step: 'recap' });
        break;
      case 'recap':
        this.setState({ step: 'skill-selection' });
        break;
      case 'skill-selection':
        didSetUp();
        break;

      default:
        break;
    }
  }

  render() {
    const { step } = this.state;
    return (
      <div className={`App main-layout setup ${step}`}>
        <Menu />
        {step === 'intro'
          && <Intro next={this.goToNextStep} />
        }
        {step === 'profil'
          && <ProfileGeneration next={this.goToNextStep} />
        }
        {step === 'recap'
          && <ProfileRecap next={this.goToNextStep} />
        }
        {step === 'skill-selection'
          && <SkillSelection next={this.goToNextStep} />
        }
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  step: state.step,
});

const mapDispatchToProps = dispatch => ({
  didSetUp: () => {
    dispatch(gameIsSetUp());
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setup);

export default componentContainer;

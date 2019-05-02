import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../logo.svg';
import { gameIsSetUp } from '../../redux/actions/steps';
import ProfilGeneration from '../../components/complexe/ProfilGeneration/ProfilGeneration';
import SkillSelection from '../../components/complexe/SkillSelection/SkillSelection';
import ProfileRecap from '../../components/complexe/ProfileRecap/ProfileRecap';
import Intro from '../../components/complexe/Intro/Intro';
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
        this.setState({ step: 'skill' });
        break;
      case 'skill':
        this.setState({ step: 'recap' });
        break;
      case 'recap':
        didSetUp();
        break;

      default:
        break;
    }
  }

  render() {
    const { step } = this.state;
    return (
      <div className="App">
        {step === 'intro'
          && <Intro next={this.goToNextStep} />
        }
        {step === 'profil'
          && <ProfilGeneration next={this.goToNextStep} />
        }
        {step === 'skill'
          && <SkillSelection next={this.goToNextStep} />
        }
        {step === 'recap'
          && <ProfileRecap next={this.goToNextStep} />
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

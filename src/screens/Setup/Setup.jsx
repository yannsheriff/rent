import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../logo.svg';
import { gameIsSetUp } from '../../redux/actions/steps';
import ProfilGeneration from '../../components/complexe/ProfilGeneration/ProfilGeneration';
import SkillSelection from '../../components/complexe/SkillSelection/SkillSelection';
import './Setup.scss';

class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 'profil',
    };
  }

  goToNextStep = () => {
    const { step } = this.state;
    const { didSetUp } = this.props;
    switch (step) {
      case 'profil':
        this.setState({ step: 'skill' });
        break;
      case 'skill':
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
        {step === 'profil'
          && <ProfilGeneration next={this.goToNextStep} />
        }
        {step === 'skill'
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

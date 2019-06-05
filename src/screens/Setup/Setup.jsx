import React, { Component } from 'react';
import { connect } from 'react-redux';
import Flickity from 'flickity';
import { gameIsSetUp } from 'redux/actions/steps';
import { MozartService } from 'services/MozartService';
import {
  ProfileGeneration,
} from 'components/logic';
import {
  Intro, SkillSelection, ProfileRecap, Menu, Launch,
} from 'components/complexe';
import './Setup.scss';

class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 'intro',
      isSetUp: false,
    };

    this.flickity = React.createRef();
  }

  componentDidMount() {
    this.flkty = new Flickity(this.flickity.current, {
      cellAlign: 'left',
      prevNextButtons: false,
      pageDots: true,
      draggable: false,
    });

    this.flkty.on('change', (index) => {
      switch (index) {
        case 0:
          this.setState({ step: 'recap' });
          break;
        case 1:
          this.setState({ step: 'skill-selection' });
          break;
        case 2:
          this.flkty.options.draggable = true;
          this.flkty.updateDraggable();
          this.setState({ step: 'launch' });
          break;
        default:
          break;
      }
    });
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
        MozartService.interaction('success');
        break;
      case 'recap':
        this.setState({ step: 'skill-selection' });
        this.flkty.select(1);
        break;
      case 'skill-selection':
        this.setState({ step: 'launch', isSetUp: true });
        this.flkty.select(2);
        break;
      case 'launch':
        didSetUp();
        break;

      default:
        break;
    }
  }

  render() {
    const { step, isSetUp } = this.state;
    return (
      <div className={`App main-layout setup transition ${step}`}>
        {/* <Menu /> */}
        {step === 'intro'
          && <Intro next={this.goToNextStep} />
        }
        <div ref={this.flickity} id="slider" className={step !== 'intro' ? 'show' : ''}>
          <div className="slide" style={isSetUp ? { pointerEvents: 'none' } : {}}>
            {step === 'profil'
              && <ProfileGeneration next={this.goToNextStep} />
            }
            {step !== 'profil' && step !== 'intro'
              && <ProfileRecap next={this.goToNextStep} />
            }
          </div>
          <div className="slide" style={isSetUp ? { pointerEvents: 'none' } : {}}>
            <SkillSelection next={this.goToNextStep} />
          </div>
          <div className="slide">
            <Launch next={this.goToNextStep} />
          </div>
        </div>
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

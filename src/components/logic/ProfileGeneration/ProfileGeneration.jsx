/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ProfileGeneration.scss';
import { Wheel } from 'components/complexe';
import allstatus from 'assets/content/status';
import allorigins from 'assets/content/origins';
import allbudget from 'assets/content/budget';
import { updateStatus, updateBudget, updateOrigin } from '../../../redux/actions/profil';

class ProfileGeneration extends Component {
  static propTypes = {
    updateStatus: PropTypes.func,
    updateBudget: PropTypes.func,
    updateOrigin: PropTypes.func,
    next: PropTypes.func,
  };

  static defaultProps = {
    updateStatus: () => {},
    updateBudget: () => {},
    updateOrigin: () => {},
    next: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      wheelIsTurning: true,
      wheelData: allstatus,
      allowClick: true,
      step: 'status',
    };
  }

  componentDidMount = () => {
    this.wheel.start();
  }

  nextStep = () => {
    const { step, wheelIsTurning, allowClick } = this.state;
    const { next } = this.props;

    this.setState({ allowClick: false });

    if (allowClick) {
      // premier click arrête la roue
      if (wheelIsTurning) {
        this.wheel.select();
        setTimeout(() => {
          this.setState({
            wheelIsTurning: false,
            allowClick: true,
          });
        }, 500); // la durée de la roue
      }

      // deuxième click change la step et start la roue
      if (!wheelIsTurning) {
        this.setState({ wheelIsTurning: true });
        switch (step) {
        // when status selection is over
          case 'status':
            this.setState({
              step: 'origin',
              wheelData: allorigins,
              allowClick: true,
            }, () => { this.wheel.start(); });
            break;

            // when origin selection is over
          case 'origin':
            this.setState({
              step: 'budget',
              wheelData: allbudget,
              allowClick: true,
            }, () => { this.wheel.start(); });
            break;

            // when origin selection is over next
          case 'budget':
            next();
            break;

          default:
            return '';
        }
      }
    }
  }

  dataIsSelected = (data) => {
    const { updateStatus, updateOrigin, updateBudget } = this.props;
    const { step } = this.state;
    switch (step) {
      case 'status':
        updateStatus(data);
        break;
      case 'origin':
        updateOrigin(data);
        break;
      case 'budget':
        updateBudget(data);
        break;
      default:
        return '';
    }
  }

  render() {
    const {
      wheelData, step,
    } = this.state;
    const { profil } = this.props;
    // const {
    //   budget, origin, status,
    // } = profil;
    return (
      <div className="intro" onClick={() => this.nextStep()}>
        <div className="profile-generation--container">
          <div className="profile-generation--title">
            <h1>Votre profil</h1>
          </div>
          <Wheel
            data={wheelData}
            fieldToShow={step === 'origin' ? 'flag' : 'picto'} // string or svg
            img={step !== 'origin'} // if is img
            onDataSelection={this.dataIsSelected}
            onRef={(ref) => { this.wheel = ref; }}
          />
          <div className="profile-generation--status">
            {step === 'status' && <h2>situation</h2>}
            {step === 'origin' && <h2>origine</h2>}
            {step === 'budget' && <h2>budget</h2>}
            <span className="profile-generation--status-main">
              {step === 'status' ? <h1>{profil.status.title}</h1> : ''}
              {step === 'origin' ? <h1>{profil.origin.title}</h1> : ''}
              {step === 'budget' ? <h1>{profil.budget.title}</h1> : ''}
            </span>
          </div>
          <div className="profile-generation--recap">
            <ul>
              <li className={profil.status.title && 'valid'}>
                {profil.status.title
                && <img src={profil.status.pictoLight} alt="" />}
              </li>
              <li className={profil.origin.title && 'valid'}>
                <div><span>{profil.origin.flag}</span></div>
              </li>
              <li className={profil.budget.title && 'valid'}>
                {profil.budget.title
                && <img src={profil.budget.pictoLight} alt="" />}
              </li>
            </ul>
          </div>
          <p className="intro--info">Toucher pour continuer</p>
        </div>
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({ profil: state.profilReducer });

const mapDispatchToProps = dispatch => ({
  updateStatus: (e) => {
    dispatch(updateStatus(e));
  },
  updateBudget: (e) => {
    dispatch(updateBudget(e));
  },
  updateOrigin: (e) => {
    dispatch(updateOrigin(e));
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileGeneration);

export default componentContainer;

/* eslint-disable no-lonely-if */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './DataHandler.scss';
import { EthanService } from 'services/EthanServices';
import { NounouService } from 'services/NounouService';
import {
  updateStatus, updateBudget, updateOrigin, updateBonus,
} from 'redux/actions/profil';
import StackHandler from '../StackHandler/StackHandler';

// components

import {
  Ads, Adventure, Event, Question, Skill, Visit, Narration, Transition,
} from '../../complexe';

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * ((max - 1) - min) + min);
}

class DataHandler extends Component {
  static propTypes = {
    step: PropTypes.string,
    profil: PropTypes.objectOf(PropTypes.object),
    next: PropTypes.func,
    fail: PropTypes.func,
    updateStatus: PropTypes.func,
    updateBudget: PropTypes.func,
    updateOrigin: PropTypes.func,
    updateBonus: PropTypes.func,
  };

  static defaultProps = {
    step: '',
    profil: {},
    next: () => {},
    fail: () => {},
    updateStatus: () => {},
    updateBudget: () => {},
    updateOrigin: () => {},
    updateBonus: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      round: 0,
      data: {},
      card: {},
      isNarration: false,
    };
  }


  // ------------------------------
  //  Initialisation des components
  //
  componentWillMount() {
    const { step } = this.props;
    const data = this.getCardData(step);
    const card = this.returnActualComponent(data, step, true);
    this.setState({ data, card });
  }

  componentWillReceiveProps(nextProps) {
    const { step } = nextProps;
    const { isNarration } = this.state;
    if (!isNarration) {
      const data = this.getCardData(step);
      const card = this.returnActualComponent(data, step, true);
      this.setState({ data, card });
    }
  }


  /* ===============================================================
  ======================= Générique functions ======================
  ================================================================ */

  // --------------------------------------------------------------
  // Cette fonction return les donnée de la carte
  // (le contenu, et le text pour les choix droite et gauche)
  //
  getCardData = (step) => {
    const { profil } = this.props;
    const data = EthanService.get(step, profil);
    const payload = { content: data };

    switch (step) {
      case 'ads':
        payload.leftChoice = 'suivant';
        payload.rightChoice = 'Visiter';
        break;

      case 'visit':
        payload.leftChoice = 'Retour aux annonces';
        payload.rightChoice = 'Déposer un dossier';
        break;

      case 'adventure':
        payload.leftChoice = data.adventure_second_choice;
        payload.rightChoice = data.adventure_first_choice;
        break;

      case 'question':
        payload.leftChoice = data.question_refuse;
        payload.rightChoice = data.question_accept;
        break;

      default:
        payload.leftChoice = '';
        payload.rightChoice = '';
        break;
    }
    return payload;
  }

  // ---------------------------------------------------------------------
  // Cette fonction return le composant qui met en forme les donnée
  // elle prend en entré, les données de contenu ainsi que la step acutel
  //
  returnActualComponent = (data, step, isNewStep = false) => {
    const childProps = { data: data.content };
    const payload = [];

    if (isNewStep && (
      step === 'visit'
      || step === 'adventure')
    ) {
      payload.push(<Transition data={step} />);
    }

    switch (step) {
      case 'ads':
        payload.push(<Ads {...childProps} />);
        break;
      case 'visit':
        payload.push(<Visit {...childProps} />);
        break;
      case 'adventure':
        payload.push(<Adventure {...childProps} />);
        break;
      case 'skill':
        payload.push(<Skill {...childProps} />);
        break;
      case 'question':
        payload.push(<Question {...childProps} />);
        break;
      case 'event':
        payload.push(<Event {...childProps} />);
        break;
      default:
        payload.push(<Ads {...childProps} />);
    }

    return payload;
  }

  // -----------------------------------------------------------------------
  // Cette fonction permet de distibuer les actions a faire lorsqu'un
  // choix a été effectué par l'ustilisateur.
  // elle prend en entré, un booléen représantant le choix de l'utilisateur.
  //
  nextCard = (choice) => {
    const { step } = this.props;

    switch (step) {
      case 'ads':
        this.handleAd(choice);
        break;

      case 'visit':
        this.handleVisit(choice);
        break;

      case 'adventure':
        this.handleAdventure(choice);
        break;

      case 'skill':
        this.handleSkill(choice);
        break;

      case 'question':
        this.handleQuestion(choice);
        break;

      case 'event':
        this.handleEvent(choice);
        break;

      default:
        return 'ads';
    }
  }

  // ---------------------------------------------------------------------
  // Cette fonction update le profile en fonction des donnée du state
  //
  updateProfile = () => {
    const {
      updateBonus,
      updateStatus,
      updateBudget,
      updateOrigin,
    } = this.props;
    const { data } = this.state;

    if (data.content.question_new_points) {
      updateBonus(data.content.question_new_points);
    }
    if (data.content.question_new_status) {
      updateStatus(data.content.question_new_status);
    }
    if (data.content.question_new_budget) {
      updateBudget(data.content.question_new_budget);
    }
    if (data.content.question_new_origin) {
      updateOrigin(data.content.question_new_origin);
    }
  }


  /* ===============================================================
  ======================= Spécifique functions ======================
  ================================================================ */

  // ---------------------------------------------------------------------
  // AD : Cette fonction s'occupe de du choix fait a partir d'une Ad
  //
  handleAd(choice) {
    const { next } = this.props;
    const { data } = this.state;
    if (choice) {
      NounouService.saveAd(data);
      next();
    } else {
      const newData = this.getCardData('ads');
      const card = this.returnActualComponent(newData, 'ads');
      this.setState({ data: newData, card });
    }
  }

  // ---------------------------------------------------------------------
  // VISIT : Cette fonction s'occupe de du choix fait a partir d'une Visite
  //
  handleVisit(choice) {
    const { next, fail, round } = this.props;
    const { data, isNarration } = this.state;
    const rand = getRandomArbitrary(0, 10);
    if (isNarration) {
      this.setState({ isNarration: false }, () => fail());
    } else {
      if (choice) {
        if (round === 0 || rand === 0) {
          const card = ([<Narration data={data.content.reject.reject_narration} />]);
          this.setState({ card, isNarration: true });
        } else {
          next();
        }
      } else {
        fail();
      }
    }
  }

  // ---------------------------------------------------------------------
  // ADVENTURE : Cette fonction s'occupe de du choix fait a partir d'une Aventure
  //
  handleAdventure(choice) {
    const { next, fail } = this.props;
    const { data, isNarration } = this.state;
    if (choice) {
      next();
    } else if (isNarration) {
      this.setState({ isNarration: false }, () => fail());
    } else {
      const card = ([<Narration data={data.content.adventure_back} />]);
      this.setState({ card, isNarration: true });
    }
  }

  // ---------------------------------------------------------------------
  // QUESTION : Cette fonction s'occupe de du choix fait a partir d'une Remise en q.
  //
  handleQuestion(choice) {
    const { next } = this.props;
    const { data, isNarration } = this.state;
    if (isNarration) {
      this.setState({ isNarration: false }, () => next());
    } else {
      const content = choice ? data.content.question_accept_narration : data.content.question_refuse_narration;
      const card = ([<Narration data={content} />]);
      this.setState({ card, isNarration: true }, () => this.updateProfile());
    }
  }

  // ---------------------------------------------------------------------
  // EVENT : Cette fonction s'occupe de du choix fait a partir d'un evenement
  //
  handleEvent() {
    const { next } = this.props;
    this.updateProfile();
    next();
  }

  /* ===============================================================
  ======================= Render function ==========================
  ================================================================ */

  render() {
    const { card, data, isNarration } = this.state;
    return (
      <StackHandler
        accept={() => this.nextCard(true)}
        reject={() => this.nextCard(false)}
        content={card}
        leftChoice={data.leftChoice}
        rightChoice={data.rightChoice}
        isNarration={isNarration}
      />
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  mainState: state.mainReducer,
  profil: state.profilReducer,
});

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
  updateBonus: (e) => {
    dispatch(updateBonus(e));
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataHandler);

export default componentContainer;

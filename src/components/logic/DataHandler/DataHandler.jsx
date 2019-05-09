/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-lonely-if */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './DataHandler.scss';
import { NounouService } from 'services/NounouService';

import {
  updateStatus, updateBudget, updateOrigin, updateBonus, updateTimer,
} from 'redux/actions/profil';
import { EthanPromise } from 'services/EthanServices';
import { endGame, displayPopUp } from 'redux/actions/steps';
import { changeStep } from 'redux/actions/steps';
import StackHandler from '../StackHandler/StackHandler';


// components
import {
  Ads, Adventure, Event, Question, Skill, Visit, Narration, Transition,
} from '../../complexe';

let EthanService = {};
EthanPromise.then((ethan) => { EthanService = ethan; });

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
    updateTimer: PropTypes.func,
    changeStep: PropTypes.func,
    popup: PropTypes.func,
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
    updateTimer: () => {},
    changeStep: () => {},
    popup: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      card: {},
      isNarration: false,
      didWin: false,
      waitingForData: true,
    };

    this.stackHandler = React.createRef();
  }


  // ------------------------------
  //  Initialisation des components
  //
  componentWillMount() {
    const { step } = this.props;

    if (EthanService.ad) {
      const data = this.getCardData(step);
      const card = this.returnActualComponent(data, step, true);
      this.setState({ data, card });
    } else {
      EthanPromise.then((ethan) => {
        EthanService = ethan;
        const data = this.getCardData(step);
        const card = this.returnActualComponent(data, step, true);
        this.setState({ data, card });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { step, profil } = nextProps;
    const { profil: oldProfil } = this.props;
    const { isNarration } = this.state;
    if (!isNarration && profil.premium === oldProfil.premium) {
      const data = this.getCardData(step);
      const card = this.returnActualComponent(data, step, true);
      this.setState({ data, card }, () => {
        // si c'est un evenement on veux appliquer directement la modification
        if (step === 'event') {
          this.setState({ isNarration: true }, () => this.updateProfile());
        }
      });
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
        payload.leftChoice = 'Passer';
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

      case 'event':
        payload.leftChoice = '';
        payload.rightChoice = '';
        break;

      default:
        payload.content = this.state.data;
        payload.leftChoice = '';
        payload.rightChoice = '';
        break;
    }
    return payload;
  }

  // ---------------------------------------------------------------------
  // Cette fonction return le composant qui met en forme les donnée
  // elle prend en entrée, les données de contenu ainsi que la step actuel
  //
  returnActualComponent = (data, step, isNewStep = false) => {
    const childProps = { data: data.content, next: this.nextCard };
    const { changeStep } = this.props;
    const payload = [];
    const update = this.returnProfilUpdate(data);

    if (isNewStep && (
      step === 'visit' || step === 'adventure')
    ) {
      if (step === 'visit') { changeStep('transition transition--visit'); }
      if (step === 'adventure') { changeStep('transition transition--adventure'); }
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
        payload.push(<Event {...childProps} update={update} />);
        break;
      default:
        payload.push(<Ads {...childProps} />);
    }

    return payload;
  }

  // -----------------------------------------------------------------------
  // Cette fonction permet de distibuer les actions a faire lorsqu'un
  // choix a été effectué par l'ustilisateur.
  // elle prend en entrée, un booléen représentant le choix de l'utilisateur.
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
    console.log('update profile');
    const {
      updateBonus,
      updateStatus,
      updateBudget,
      updateOrigin,
      updateTimer,
    } = this.props;

    const update = this.returnProfilUpdate();

    if (update.field === 'points') {
      updateBonus(update.value);
    }
    if (update.field === 'status') {
      updateStatus(update.value);
    }
    if (update.field === 'budget') {
      updateBudget(update.value);
    }
    if (update.field === 'origin') {
      updateOrigin(update.value);
    }
    if (update.field === 'time') {
      updateTimer(update.value);
    }
  }

  returnProfilUpdate = (data) => {
    const { data: stateData } = this.state;
    const usableData = data || stateData;
    const { step } = this.props;

    const updateTypes = ['points', 'status', 'budget', 'origin', 'time'];
    const fieldToUpdate = updateTypes.filter(type => usableData.content[`${step}_new_${type}`]);
    const update = fieldToUpdate.map(type => ({ field: type, value: usableData.content[`${step}_new_${type}`] }));
    return fieldToUpdate.length ? update[0] : false;
  }


  /* ===============================================================
  ======================= Spécifique functions ======================
  ================================================================ */

  // ---------------------------------------------------------------------
  // AD : Cette fonction s'occupe de du choix fait a partir d'une Ad
  //
  handleAd(choice) {
    const { next, profil, popup } = this.props;
    const { data } = this.state;

    if (choice) {
      if (data.content.ad_source === 'premium' && !profil.premium) {
        popup('premium');
        setTimeout(() => this.stackHandler.rerollCard(), 150);
      } else {
        NounouService.saveAd(data.content);
        next();
      }
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
    // dossier refusé donc retour aux annonces
    if (isNarration) {
      this.setState({ isNarration: false }, () => fail());
    } else {
      // carte visite
      NounouService.saveVisit(data.content.visit);
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
    if (isNarration) {
      this.setState({ isNarration: false }, () => fail());
    } else {
      NounouService.saveAdventure(data.content);
      if (choice) {
        next();
      } else {
        const card = ([<Narration data={data.content.adventure_back} />]);
        this.setState({ card, isNarration: true });
      }
    }
  }

  // ---------------------------------------------------------------------
  // SKILLS : Cette fonction s'occupe du choix fait a partir d'un skill
  //
  handleSkill(choice) {
    const { endGame } = this.props;
    const { data, isNarration, didWin } = this.state;
    if (isNarration) {
      endGame(didWin ? 'win' : 'loose');
    } else {
      if (choice) {
        const card = ([<Narration data={data.content.content.adventure_victory} />]);
        this.setState({ card, isNarration: true, didWin: true });
      } else {
        const card = ([<Narration data={data.content.content.adventure_defeat} />]);
        this.setState({ card, isNarration: true });
      }
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
      NounouService.saveQuestion(data.content);
      const content = choice ? data.content.question_accept_narration : data.content.question_refuse_narration;
      const update = this.returnProfilUpdate();
      const card = ([<Narration data={content} animation={update} />]);
      this.setState({ card, isNarration: true }, () => {
        if (choice) { this.updateProfile(); }
      });
    }
  }

  // ---------------------------------------------------------------------
  // EVENT : Cette fonction s'occupe de du choix fait a partir d'un evenement
  //
  handleEvent() {
    const { next } = this.props;
    const { data } = this.state;
    NounouService.saveEvent(data.content);
    this.setState({ isNarration: false }, () => next());
  }

  /* ===============================================================
  ======================= Render function ==========================
  ================================================================ */

  render() {
    const { card, data, isNarration } = this.state;
    const { step } = this.props;
    return (
      <StackHandler
        accept={() => this.nextCard(true)}
        reject={() => this.nextCard(false)}
        content={card}
        leftChoice={data.leftChoice}
        rightChoice={data.rightChoice}
        isNarration={isNarration}
        step={step}
        onRef={(ref) => { this.stackHandler = ref; }}
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
  updateTimer: (e) => {
    dispatch(updateTimer(e));
  },
  endGame: (win) => {
    dispatch(endGame(win));
  },
  changeStep: (e) => {
    dispatch(changeStep(e));
  },
  popup: (type) => {
    dispatch(displayPopUp(type));
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataHandler);

export default componentContainer;

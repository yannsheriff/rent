/* eslint-disable no-lonely-if */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './DataHandler.scss';
import { CSSTransition } from 'react-transition-group';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { EthanService } from '../../../services/EthanServices';
import { NounouService } from '../../../services/NounouService';
import StackHandler from '../StackHandler/StackHandler';
import {
  updateStatus, updateBudget, updateOrigin, updateScore,
} from '../../../redux/actions/profil';


// components

import Ads from '../../complexe/Ads/Ads';
import Adventure from '../../complexe/Adventure/Adventure';
import Event from '../../complexe/Event/Event';
import Question from '../../complexe/Question/Question';
import Skill from '../../complexe/Skill/Skill';
import Visit from '../../complexe/Visit/Visit';

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * ((max - 1) - min) + min);
}

class DataHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ads: EthanService.get('ads', props.profil),
      actualAd: 0,
      round: 0,
      data: {},
      card: {},
      actualStep: 'ads',
      isNarration: false,
    };
  }


  // ------------------------------
  //  Initialisation des components
  //
  componentWillMount() {
    const { step } = this.props;
    const data = this.getCardData(step);
    const card = this.returnActualComponent(data, step);
    this.setState({ data, card });
  }

  componentWillReceiveProps(nextProps) {
    const { step } = nextProps;
    const { isNarration } = this.state;
    if (!isNarration) {
      const data = this.getCardData(step);
      const card = this.returnActualComponent(data, step);
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
    const { ads, actualAd } = this.state;
    const data = EthanService.get(step, profil);
    const payload = { content: data };

    switch (step) {
      case 'ads':
        payload.content = ads[actualAd];
        payload.leftChoice = 'suivant';
        payload.rightChoice = 'Visiter';
        break;

      case 'visit':
        payload.leftChoice = 'retour aux annonces';
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
  returnActualComponent = (data, step) => {
    const childProps = {
      data: data.content,
    };

    switch (step) {
      case 'ads':
        return <Ads {...childProps} />;

      case 'visit':
        return <Visit {...childProps} />;

      case 'adventure':
        return <Adventure {...childProps} />;

      case 'skill':
        return <Skill {...childProps} />;

      case 'question':
        return <Question {...childProps} />;

      case 'event':
        return <Event {...childProps} />;

      default:
        return <Ads {...childProps} />;
    }
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
      updateScore,
      updateStatus,
      updateBudget,
      updateOrigin,
    } = this.props;
    const { data } = this.state;

    if (data.content.question_new_points) {
      updateScore(data.content.question_new_points);
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
    const { data, actualAd, ads } = this.state;
    if (choice) {
      this.setState(state => ({ actualAd: state.actualAd + 1, data: state.ads[actualAd + 1] }));
      NounouService.saveAd(data);
      next();
    } else if (ads.length <= actualAd) {
      this.setState({
        actualAd: 0,
      }, () => {
        const newData = this.getCardData('ads');
        const card = this.returnActualComponent(newData, 'ads');
        this.setState({ data: newData, card });
      });
    } else {
      this.setState(state => ({
        actualAd: state.actualAd + 1,
      }), () => {
        const newData = this.getCardData('ads');
        const card = this.returnActualComponent(newData, 'ads');
        this.setState({ data: newData, card });
      });
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
          const card = (<div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.content.reject.reject_narration) }} />);
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
      const card = (<div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.content.adventure_back) }} />);
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
      const card = (<div dangerouslySetInnerHTML={{ __html: documentToHtmlString(content) }} />);
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
  updateScore: (e) => {
    dispatch(updateScore(e));
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataHandler);

export default componentContainer;

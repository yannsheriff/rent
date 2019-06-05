/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-lonely-if */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { number } from 'prop-types';
import './DataHandler.scss';
import { NounouService } from 'services/NounouService';
import { SocrateService } from 'services/SocrateService';
import {
  updateStatus, updateBudget, updateOrigin, updateBonus, updateTimer,
} from 'redux/actions/profil';
import statusData from 'assets/content/status';
import originData from 'assets/content/origins';
import budgetData from 'assets/content/budget';
import { EthanPromise } from 'services/EthanServices';
import { endGame, displayPopUp, changeStep } from 'redux/actions/steps';
import {
  Ads, Adventure, Event, Question, Skill, Visit, Narration, Transition,
} from 'components/card-template';
import { getRandomWithProba } from 'vendors/probability';
import StackHandler from '../StackHandler/StackHandler';


// components

let EthanService = {};
EthanPromise.then((ethan) => { EthanService = ethan; });

class DataHandler extends Component {
  static propTypes = {
    step: PropTypes.string,
    profil: PropTypes.object,
    next: PropTypes.func,
    fail: PropTypes.func,
    round: PropTypes.number,
    endGame: PropTypes.func,
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
    round: 0,
    endGame: () => {},
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
      needQuestion: false,
      didWin: false,
    };

    this.stackHandler = React.createRef();
  }


  // ------------------------------
  //  Initialisation des components
  //
  componentWillMount() {
    const { step, round } = this.props;

    if (EthanService.ad) {
      const data = this.getCardData(step);
      const card = this.returnActualComponent(data, step, true, round);
      this.setState({ data, card });
    } else {
      EthanPromise.then((ethan) => {
        EthanService = ethan;
        const data = this.getCardData(step);
        const card = this.returnActualComponent(data, step, true, round);
        this.setState({ data, card });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { step, profil, round } = nextProps;
    const { profil: oldProfil } = this.props;
    const { isNarration } = this.state;
    if (!isNarration && profil.premium === oldProfil.premium) {
      const data = this.getCardData(step);
      const card = this.returnActualComponent(data, step, true, round);
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
  returnActualComponent = (data, step, isNewStep = false, round) => {
    const childProps = { data: data.content, next: this.nextCard };
    const { changeStep, profil } = this.props;
    const payload = [];

    if (isNewStep && (
      step === 'visit' || step === 'adventure' || (step === 'ads' && round === 0))
    ) {
      if (step === 'visit') { changeStep('transition transition--visit'); }
      if (step === 'adventure') { changeStep('transition transition--adventure'); }
      if (step === 'ads' && round === 0) { changeStep('transition transition--ads'); }
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
        const update = this.returnProfilUpdate(data, step);
        payload.push(<Event {...childProps} animation={{ oldProfil: profil, update }} />);
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

  // ---------------------------------------------------------------------
  // Cette fonction retourne l'objet associé à la nouvelle valeur du profil
  //

  returnProfilUpdateData = (field, value) => {
    switch (field) {
      case 'status':
        return statusData.filter(status => status.ref === value)[0];
      case 'origin':
        return originData.filter(origin => origin.ref === value)[0];
      case 'budget':
        return budgetData.filter(budget => budget.ref === value)[0];
      default:
        return '';
    }
  }

  returnProfilUpdate = (data, step) => {
    const { step: propsStep } = this.props;
    const { data: stateData } = this.state;
    const usableData = data || stateData;
    const usableStep = step || propsStep;
    const updateTypes = ['points', 'status', 'budget', 'origin', 'time'];
    const fieldToUpdate = updateTypes.filter(type => usableData.content[`${usableStep}_new_${type}`]);
    const update = fieldToUpdate.map(type => ({ field: type, value: usableData.content[`${usableStep}_new_${type}`] }))[0];
    if (fieldToUpdate[0] === 'status'
    || fieldToUpdate[0] === 'budget'
    || fieldToUpdate[0] === 'origin') {
      const returnData = this.returnProfilUpdateData(fieldToUpdate[0], update.value);
      update.value = returnData;
    }
    return fieldToUpdate.length ? update : false;
  }


  /* ===============================================================
  ======================= Spécifique functions ======================
  ================================================================ */

  // ---------------------------------------------------------------------
  // AD : Cette fonction s'occupe de du choix fait a partir d'une Ad
  //
  handleAd(choice) {
    const {
      next, fail, profil, popup,
    } = this.props;
    const { data, isNarration } = this.state;
    if (isNarration) {
      this.setState({ isNarration: false }, () => fail());
    } else {
      if (choice) {
        // check si le profil est premium
        if (data.content.ad_source === 'premium' && !profil.premium) {
          popup('premium');
          setTimeout(() => this.stackHandler.rerollCard(), 150);
        } else {
          // check si le profil a le bon budget
          if (profil.budget.value < data.content.ad_budget) {
            const card = ([
              <Narration
                data="Cet appartement n'est clairement pas dans votre budget."
                title="Hors de prix"
              />,
            ]);
            this.setState({ card, isNarration: true });
          } else {
            NounouService.saveAd(data.content);
            next();
          }
        }
      } else {
        let newData = {};
        do {
          newData = this.getCardData('ads');
        } while (JSON.stringify(newData) === JSON.stringify(data));

        const card = this.returnActualComponent(newData, 'ads');
        this.setState({ data: newData, card });
      }
    }
  }

  // ---------------------------------------------------------------------
  // VISIT : Cette fonction s'occupe de du choix fait a partir d'une Visite
  //
  handleVisit(choice) {
    const {
      next, fail, profil,
    } = this.props;
    const { data, isNarration, needQuestion } = this.state;
    // dossier refusé donc retour aux annonces
    if (isNarration) {
      this.setState({ isNarration: false }, () => fail(needQuestion));
    } else {
      // carte visite - accepter la visite
      NounouService.saveVisit(data.content.visit);
      SocrateService.saveChoice(data.content.visit, choice);
      if (choice) {
        // refus si l'appartement visité a une note trop haute sauf si l'utilisateur est premium
        if (NounouService.actualFlat.ad_rate >= profil.score + 0.5 && !profil.premium) {
          const card = ([
            <Narration
              data={data.content.reject.reject_narration}
              title={data.content.reject.reject_title}
            />,
          ]);
          this.setState({ card, isNarration: true, needQuestion: true });
        } else {
          const interval = parseFloat((NounouService.actualFlat.ad_rate - profil.score).toFixed(1));
          // si l'utilisateur est à 0.5 points de la note de l'appart on tente la dernière chance
          if (interval < 0.5 && interval > 0 && !profil.premium) {
            // on tire au sort une proba
            const lastChance = getRandomWithProba(interval);
            if (lastChance) {
              next();
            } else {
              const card = ([
                <Narration
                  data={data.content.reject.reject_narration}
                  title={data.content.reject.reject_title}
                />,
              ]);
              this.setState({ card, isNarration: true, needQuestion: true });
            }
          // sinon tout est ok
          } else {
            next();
          }
        }
      // refuser la visit
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
      NounouService.saveAdventure(data.content, choice);
      SocrateService.saveChoice(data.content, choice);
      if (choice) {
        next();
      } else {
        const card = ([<Narration
          data={data.content.adventure_back}
          title={data.content.adventure_second_choice}
        />]);
        this.setState({ card, isNarration: true });
      }
    }
  }

  // ---------------------------------------------------------------------
  // SKILLS : Cette fonction s'occupe du choix fait a partir d'un skill
  //
  handleSkill(choice) {
    const { endGame, fail, updateTimer } = this.props;
    const { data, isNarration, didWin } = this.state;
    if (isNarration) {
      didWin ? endGame('win') : this.setState({ isNarration: false }, () => fail());
    } else {
      if (choice) {
        const card = ([
          <Narration
            data={data.content.content.adventure_victory}
            title={data.content.content.adventure_first_choice}
            winningSkill={data.content.content.adventure_skill}
          />,
        ]);
        this.setState({ card, isNarration: true, didWin: true });
      } else {
        // on enleve du temps et on retourne aux annonces
        updateTimer(-90);
        const card = ([
          <Narration
            data={data.content.content.adventure_defeat}
            title={data.content.content.adventure_first_choice}
          />,
        ]);
        this.setState({ card, isNarration: true });
      }
    }
  }

  // ---------------------------------------------------------------------
  // QUESTION : Cette fonction s'occupe de du choix fait a partir d'une Remise en q.
  //
  handleQuestion(choice) {
    const { next, profil } = this.props;
    const { data, isNarration } = this.state;
    if (isNarration) {
      this.setState({ isNarration: false }, () => next());
    } else {
      NounouService.saveQuestion(data.content, choice);
      SocrateService.saveChoice(data.content, choice);
      const content = choice ? data.content.question_accept_narration : data.content.question_refuse_narration;
      const title = choice ? data.content.question_accept : data.content.question_refuse;
      const update = this.returnProfilUpdate();
      const card = ([<Narration
        data={content}
        animation={{ oldProfil: profil, update, choice }}
        title={title}
      />]);
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

/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import PropTypes from 'prop-types';
import './Narration.scss';
import lottie from 'lottie-web';

/* LOTTIES */
import rejects from 'assets/animation/reject';
import defeats from 'assets/animation/defeat';
import statuschange from 'assets/animation/status_change_question';
import budgetchange from 'assets/animation/budget_change_question';
import animations from 'assets/animation';

import skills from 'assets/content/skills';
import reject from 'assets/img/visit/reject.svg';


class Narration extends Component {
  static propTypes = {
    title: PropTypes.string,
    winningSkill: PropTypes.string,
    type: PropTypes.string,
    defeatType: PropTypes.string,
    choice: PropTypes.bool,
  };

  static defaultProps = {
    title: '',
    winningSkill: '',
    type: '',
    defeatType: '',
    choice: false,
  };

  constructor(props) {
    super(props);
    this.animationContainer = React.createRef();
  }

  componentDidMount() {
    const anim = this.getLottie();
    lottie.loadAnimation({
      container: this.animationContainer.current, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: anim, // the path to the animation json
    });
  }

  /*
    REMISES EN QUESTION
  */

  getQuestion = () => {
    const { animation: { oldProfil, update, choice } } = this.props;
    let isPositive = true;
    if (update.field === 'points') {
      isPositive = oldProfil[update.field] < update.value || update.value > 0;
    } else {
      isPositive = oldProfil[update.field].value < update.value.value || update.value > 0;
    }
    switch (update.field) {
      case 'points':
        if (choice) {
          return isPositive ? animations.question_good : animations.question_bad;
        }
        return isPositive ? animations.question_bad : animations.question_good;

        // case 'origin':
        //   return oldProfil.origin < update.value ? animations.question_good : animations.question_bad;

      case 'status':
        if (choice) {
          return statuschange[`${oldProfil.status.ref}_${update.value.ref}`];
        }
        return oldProfil.status < update.value ? animations.question_good : animations.question_bad;

      case 'budget':
        if (choice) {
          return budgetchange[`${oldProfil.budget.ref}_${update.value.ref}`];
        }
        return oldProfil.budget < update.value ? animations.question_good : animations.question_bad;

      default:
        return isPositive && choice ? animations.question_good : animations.question_bad;
    }
  }

  /*
    DEFAITE DES PERIPETIES
  */

  getDefeatType = () => {
    const { defeatType } = this.props;
    switch (defeatType) {
      case 'prison': return defeats.defeatPrison;
      case 'sex': return defeats.defeatSex;
      case 'province': return defeats.defeatProvince;
      case 'surnaturel': return defeats.defeatSurnaturel;
      case 'hopital': return defeats.defeatHopital;
      case 'banqueroute': return defeats.defeatBanqueroute;
      case 'rue': return defeats.defeatRue;
      default: return '';
    }
  }

  /*
    SKILLS
  */

  returnSkill = (skill) => {
    const goodSkill = skills.filter(item => item.id === skill)[0];
    return goodSkill.title;
  }

  getLottie = () => {
    const { type } = this.props;
    switch (type) {
      case 'reject-ads': return rejects.rejectAds;
      case 'reject-visit': return rejects.rejectVisit;
      case 'narration-question': {
        const animQuestion = this.getQuestion();
        return animQuestion;
      }
      case 'narration-adventure': return '';
      case 'winning-skill': return animations.skill_win;
      case 'loosing-skill': {
        const animDefeat = this.getDefeatType();
        return animDefeat;
      }
      default: return '';
    }
  }

  getQuestionIndication() {
    const { animation: { oldProfil, update } } = this.props;
    let isPositive = false;
    switch (update.field) {
      case 'status': return (
        <span>
          Vous cherchez désormais
          {' '}
          <span className="lowercase">{update.value.title}</span>
        </span>
      );

      case 'budget':
        return (
          <span>
            Vous avez désormais un budget
            {' '}
            <span className="lowercase">{update.value.title}</span>
          </span>
        );

      case 'points':
        isPositive = update.value > 0;
        return isPositive ? 'Votre note de dossier augmente !' : 'Votre note de dossier diminue...';

      case 'time':
        isPositive = update.value > 0;
        return isPositive ? 'Vous gagnez 2 semaines !' : 'Vous perdez 2 semaines...';

      default:
        return '';
    }
  }

  getIndication = () => {
    const { type, choice } = this.props;
    switch (type) {
      case 'reject-ads': return 'Votre budget n\'est pas suffisant !';
      case 'reject-visit': return 'Votre note de dossier est trop basse !';
      case 'narration-question': {
        if (choice) {
          const indication = this.getQuestionIndication();
          return indication;
        }
        return '';
      }
      case 'narration-adventure': return '';
      case 'winning-skill': return '';
      case 'loosing-skill': { return 'Vous n\'avez pas dû utiliser la bonne capacité... Vous perdez 1 mois.'; }
      default: return '';
    }
  };

  render() {
    const {
      data, title, animation, winningSkill, type,
    } = this.props;
    return (
      <div id="narration">
        <div className="narration--container">
          {/* {type === 'loosing-skill'
          && (<h3 className="loosing-skill">Vous n'avez pas dû utiliser la bonne capacité...</h3>)
          } */}
          {(type === 'narration-adventure')
          && (<div className="narration--quote height--120"><span>”</span></div>)
          }
          {(type !== 'narration-adventure')
          && (<div className={`animation ${type === 'loosing-skill' ? 'height--120' : 'height--150'}`} ref={this.animationContainer} />)
          }
          <h1 className="card--title">{ title }</h1>

          <div className="grow card--text" >
            {type === 'winning-skill'
            && (
            <span className="bold">Grace à votre capacité
              {' '}
              { this.returnSkill(winningSkill) }
              {', '}
            </span>
            )
            }

            {typeof (data) === 'string' && <div className="grow">{data}</div>}
            <span dangerouslySetInnerHTML={{ __html: documentToHtmlString(data) }} />
          </div>
          <div className="indication card--choice">
            { this.getIndication() }
          </div>
        </div>
      </div>
    );
  }
}
export default Narration;

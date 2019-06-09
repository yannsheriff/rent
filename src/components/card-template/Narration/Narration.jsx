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
import statuschange from 'assets/animation/status_change';
import animations from 'assets/animation';

import skills from 'assets/content/skills';
import reject from 'assets/img/visit/reject.svg';


class Narration extends Component {
  static propTypes = {
    title: PropTypes.string,
    winningSkill: PropTypes.string,
    type: PropTypes.string,
    defeatType: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    winningSkill: '',
    type: '',
    defeatType: '',
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
    const { animation, animation: { oldProfil, update, choice } } = this.props;
    let isPositive = true;
    if (update.field === 'points') {
      isPositive = oldProfil[update.field] < update.value || update.value > 0;
    } else {
      isPositive = oldProfil[update.field].value < update.value.value || update.value > 0;
    }
    switch (update.field) {
      case 'points':
        return isPositive && choice ? animations.question_good : animations.question_bad;

      case 'origin':
        return oldProfil.origin < update.value ? animations.question_good : animations.question_bad;

      case 'status':
        // return oldProfil.status < update.value ? animations.question_good : animations.question_bad;
        return statuschange[`${oldProfil.status.ref}_${update.value.ref}`];

      case 'budget':
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
    const {
      data, type,
    } = this.props;
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

  render() {
    const {
      data, title, animation, winningSkill, type,
    } = this.props;
    return (
      <div id="narration">
        <div className="narration--container">
          {type === 'loosing-skill'
          && (<h3 className="loosing-skill"> Vous avez perdu un mois..</h3>)
          }
          {(type === 'narration-adventure')
          && (<div className="narration--quote"><span>”</span></div>)
          }
          <div className="animation" ref={this.animationContainer} />
          <h1 className="card--title">{ title }</h1>

          {type === 'winning-skill'
          && (
          <div>
            Grace à votre capacité
            {' '}
            { this.returnSkill(winningSkill) }
            {', '}
          </div>
          )
          }
          {/* temporaire pour tester */}
          {typeof (data) === 'string' && <div>{data}</div>}
          <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data) }} />
        </div>
      </div>
    );
  }
}
export default Narration;

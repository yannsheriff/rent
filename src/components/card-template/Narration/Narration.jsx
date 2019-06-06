/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import PropTypes from 'prop-types';
import './Narration.scss';
import lottie from 'lottie-web';
import animations from 'assets/animation';

import skills from 'assets/content/skills';
import reject from 'assets/img/visit/reject.svg';

class Narration extends Component {
  static propTypes = {
    title: PropTypes.string,
    winningSkill: PropTypes.string,
    type: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    winningSkill: '',
    type: '',
  };

  constructor(props) {
    super(props);
    this.animationContainer = React.createRef();
  }

  componentDidMount() {
    if (this.props.animation) {
      const anim = this.findAnimation();
      lottie.loadAnimation({
        container: this.animationContainer.current, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: anim, // the path to the animation json
      });
    }
  }

  returnSkill = (skill) => {
    const goodSkill = skills.filter(item => item.id === skill)[0];
    return goodSkill.title;
  }

  findAnimation() {
    const { animation, animation: { oldProfil, update, choice } } = this.props;
    let isPositive = true;
    if (update.field === 'points') {
      isPositive = oldProfil[update.field] < update.value || update.value > 0;
    } else {
      isPositive = oldProfil[update.field].value < update.value.value || update.value > 0;
    }
    switch (update.field) {
      // case 'points':
      //   return isPositive && choice ? animations.question_good : animations.question_bad;

      // case 'origin':
      //   return oldProfil.origin < update.value ? animations.question_good : animations.question_bad;

      // case 'status':
      //   return oldProfil.status < update.value ? animations.question_good : animations.question_bad;

      // case 'budget':
      //   return oldProfil.budget < update.value ? animations.question_good : animations.question_bad;

      default:
        // return '';
        return isPositive && choice ? animations.question_good : animations.question_bad;
    }
  }

  getCardContent = (type) => {
    switch (type) {
      case 'reject_ad':
        return '';

      case 'reject_visit':
        return '';

      case 'narration_question':
        return '';

      case 'narration_adventure':
        return '';

      case 'winning_skill':
        return '';

      case 'loosing_skill':
        return '';

      default:
        return '';
    }
  }

  render() {
    const {
      data, title, animation, winningSkill, type,
    } = this.props;

    console.log(data);
    return (
      <div id="narration">
        <div className="narration--container">
          {!animation
          && (
          <>
            <span className="narration--quote">”</span>
            {/* <img src={reject} alt="reject" /> */}
          </>
          )
          }
          <div className="animation" ref={this.animationContainer} />
          <h1 className="card--title">{ title }</h1>
          {winningSkill
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

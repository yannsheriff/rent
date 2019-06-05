/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Adventure.scss';
import lottie from 'lottie-web';
import animations from 'assets/animation';
import trueStroy from 'assets/img/true-story.svg';

/* ILLUSTRATIONS */

// import adventure from 'assets/img/adventure/.gif';

class Adventure extends Component {
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

  findAnimation() {
    const { animation, animation: { oldProfil, update, choice } } = this.props;
    const isPositive = oldProfil[update.field] < update.value || update.value > 0;
    switch (update.field) {
      // case 'origin':
      //   return oldProfil.origin < update.value ? animations.question_good : animations.question_bad;

      // case 'status':
      //   return oldProfil.status < update.value ? animations.question_good : animations.question_bad;

      // case 'budget':
      //   return oldProfil.budget < update.value ? animations.question_good : animations.question_bad;

      default:
        return isPositive && choice ? animations.question_good : animations.question_bad;
    }
  }


  render() {
    const { data } = this.props;
    return (
      <div className="card--content card--adventure">
        <h2 className="card--type">Péripétie</h2>
        <div className="card--illu--container">
          {/* <img className="card--illu" src={ads} alt="" /> */}
          {data.adventure_story
            && <img className="true-story" src={trueStroy} alt="histoire vrai" />
          }
        </div>

        <div className="animation" ref={this.animationContainer} />
        <h1>{ data.adventure_title }</h1>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.adventure_narration) }} />
      </div>
    );
  }
}

export default Adventure;

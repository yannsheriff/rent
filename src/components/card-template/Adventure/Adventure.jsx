/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Adventure.scss';
import lottie from 'lottie-web';
import trueStroy from 'assets/img/true-story.svg';

/* LOTTIES */
import animAdventure from 'assets/animation/adventure/anim_adventure.json';

// import adventure from 'assets/img/adventure/.gif';

class Adventure extends Component {
  constructor(props) {
    super(props);
    this.animationContainer = React.createRef();
  }

  componentDidMount() {
    lottie.loadAnimation({
      container: this.animationContainer.current, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animAdventure, // the path to the animation json
    });
  }

  render() {
    const { data } = this.props;
    return (
      <div className="card--content card--adventure">
        <h2 className="card--type">Péripétie</h2>
        <div className="animation animation--small" ref={this.animationContainer}>
          {data.adventure_story
            && <img className="true-story" src={trueStroy} alt="histoire vrai" />
          }
        </div>
        <h1>{ data.adventure_title }</h1>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.adventure_narration) }} />
      </div>
    );
  }
}

export default Adventure;

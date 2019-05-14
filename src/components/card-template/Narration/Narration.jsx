/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import PropTypes from 'prop-types';
import './Narration.scss';
import lottie from 'lottie-web';
import animations from 'assets/animation';

import skills from 'assets/content/skills';


class Narration extends Component {
  static propTypes = {
    title: PropTypes.string,
    winningSkill: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    winningSkill: '',
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

  returnSkill(skill) {
    const goodSkill = skills.filter(item => item.id === skill)[0];
    return goodSkill.title;
  }

  findAnimation() {
    const { animation } = this.props;

    switch (animation.field) {
      case 'status':
        return animation.value > 0 ? animations.status_single : animations.status_single;

      case 'budget':
        return animation.value > 0 ? animations.budget_up : animations.budget_up;

      default:
        return animations.positif;
    }
  }

  render() {
    const {
      data, title, animation, winningSkill,
    } = this.props;
    return (
      <div id="narration">
        <div className="narration--container">
          {!animation
          && <span className="narration--quote">”</span>
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
          <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data) }} />
        </div>
      </div>
    );
  }
}
export default Narration;

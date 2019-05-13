/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Narration.scss';
import lottie from 'lottie-web';
import animations from 'assets/animation';


class Narration extends Component {
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
    const { data, title } = this.props;
    return (
      <div id="narration">
        <div className="animation" ref={this.animationContainer} />
        <h1>{ title }</h1>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data) }} />
      </div>
    );
  }
}
export default Narration;

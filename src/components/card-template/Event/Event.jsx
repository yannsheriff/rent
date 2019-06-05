/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Event.scss';
import lottie from 'lottie-web';
import animations from 'assets/animation';

class Event extends Component {
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
    const { animation: { oldProfil, update } } = this.props;
    let isPositive = false;
    switch (update.field) {
      case 'origin':
        isPositive = oldProfil[update.field] < update.value.value || update.value > 0;
        return isPositive ? animations.event_good : animations.event_bad;

      case 'status':
        isPositive = oldProfil[update.field] < update.value.value || update.value > 0;
        return isPositive ? animations.event_good : animations.event_bad;

      case 'budget':
        isPositive = oldProfil[update.field].value < update.value.value || update.value > 0;
        return isPositive ? animations.event_good : animations.event_bad;

      default:
        isPositive = oldProfil[update.field] < update.value || update.value > 0;
        return isPositive ? animations.event_good : animations.event_bad;
    }
  }

  render() {
    const { data } = this.props;
    return (
      <div className="card--content card--event">
        <h2 className="card--type">évènement</h2>
        <div className="card--illu--container">
          <div className="animation" ref={this.animationContainer} />
        </div>
        {/* <img className="card--illu" src={ads} alt="" /> */}
        <h1>{data.event_title}</h1>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.event_narration) }} />
      </div>
    );
  }
}
export default Event;

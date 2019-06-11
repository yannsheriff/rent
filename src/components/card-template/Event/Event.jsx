/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Event.scss';
import lottie from 'lottie-web';
import animations from 'assets/animation';
import statuschange from 'assets/animation/status_change_event';
import budgetchange from 'assets/animation/budget_change_event';

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

  getIndication() {
    const { animation: { oldProfil, update } } = this.props;
    let isPositive = false;
    switch (update.field) {
      case 'status':
        return `Vous cherchez désormais ${update.value.title}`;

      case 'budget':
        return `Vous avez désormais un budget ${update.value.title}`;

      case 'points':
        isPositive = update.value > 0;
        return isPositive ? 'Votre note de dossier augmente !' : 'Votre note de dossier diminue...';

      case 'time':
        isPositive = update.value > 0;
        return isPositive ? 'Cela vous fait gagner 2 semaines !' : 'Cela vous fait perdre 2 semaines...';

      default:
        return '';
    }
  }

  findAnimation() {
    const { animation: { oldProfil, update } } = this.props;
    let isPositive = false;
    switch (update.field) {
      case 'origin':
        return '';
        //   isPositive = oldProfil[update.field] < update.value.value || update.value > 0;
        //   return isPositive ? animations.event_good : animations.event_bad;

      case 'status':
        return statuschange[`${oldProfil.status.ref}_${update.value.ref}`];

      case 'budget':
        return budgetchange[`${oldProfil.budget.ref}_${update.value.ref}`];

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
        <div className="animation height--120" ref={this.animationContainer} />
        <h1>{data.event_title}</h1>
        <div className="grow card--text" dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.event_narration) }} />
        <div className="indication">
          <span className="card--choice">
            { this.getIndication() }
          </span>
        </div>
      </div>
    );
  }
}
export default Event;

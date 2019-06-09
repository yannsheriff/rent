/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Visit.scss';
import lottie from 'lottie-web';

/* LOTTIES */
import visits from 'assets/animation/visit/';
import trueStroy from 'assets/img/true-story.svg';

class Visit extends Component {
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

  getLottie = () => {
    const { data } = this.props;
    switch (data.visit.visit_quality) {
      case 'good':
        return visits.visitGood;
      case 'ok':
        return visits.visitOk;
      case 'bad':
        return visits.visitBad;
      default:
        return visits.visitOk;
    }
  }

  render() {
    const { data } = this.props;
    return (
      <div className="card--content card--visit">
        <h2 className="card--type">Visite</h2>
        <div className="card--illu--container">
          <div className="animation" ref={this.animationContainer} />
          {data.visit.visit_story === 'true'
            && <img className="true-story" src={trueStroy} alt="histoire vrai" />
          }
        </div>

        <h1>{ data.visit.visit_title }</h1>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.visit.visit_description) }} />
      </div>
    );
  }
}

export default Visit;

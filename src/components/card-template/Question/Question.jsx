/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Question.scss';
import lottie from 'lottie-web';
import animations from 'assets/animation';


class Question extends Component {
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
      animationData: animations.question, // the path to the animation json
    });
  }

  render() {
    const { data } = this.props;
    return (
      <div className="card--content card--question">
        {/* <img className="card--illu" src={question} alt="" /> */}
        <div className="animation card--illu" ref={this.animationContainer} />
        <div
          dangerouslySetInnerHTML={
                { __html: documentToHtmlString(data.question_narration) }
              }
        />
      </div>
    );
  }
}

export default Question;

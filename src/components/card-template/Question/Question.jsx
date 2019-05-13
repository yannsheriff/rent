/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import question from 'assets/img/ads/test.gif';
import './Question.scss';

class Question extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="card--content card--question">
        <h2 className="card--type">Remise en question</h2>
        {/* <img className="card--illu" src={question} alt="" /> */}
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

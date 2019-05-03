/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Question.scss';


class Question extends Component {
  render() {
    const { data } = this.props;
    return (
      <div id="question">
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

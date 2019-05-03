/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Adventure.scss';

class Adventure extends Component {
  render() {
    const { data } = this.props;
    return (
      <div id="adventure">
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.adventure_narration) }} />
      </div>
    );
  }
}

export default Adventure;

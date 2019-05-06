/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Narration.scss';


class Narration extends Component {
  render() {
    const { data } = this.props;

    return (
      <div id="narration">
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data) }} />
      </div>
    );
  }
}
export default Narration;

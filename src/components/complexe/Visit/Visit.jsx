/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Visit.scss';

class Visit extends Component {
  render() {
    const { data } = this.props;
    return (
      <div id="visit">
        <h1>{ data.visit.visit_quality }</h1>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.visit.visit_description) }} />
      </div>
    );
  }
}

export default Visit;

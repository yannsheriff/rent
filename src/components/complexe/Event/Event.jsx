/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Event.scss';

class Event extends Component {
  render() {
    const { data } = this.props;

    return (
      <div id="event">
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.event_narration) }} />
      </div>
    );
  }
}
export default Event;


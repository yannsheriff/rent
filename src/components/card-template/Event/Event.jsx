/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import ads from 'assets/img/ads/test.gif';
import './Event.scss';

class Event extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="card--content card--event">
        <h2 className="card--type">Evènement</h2>
        {/* <img className="card--illu" src={ads} alt="" /> */}
        <h1>{data.event_title}</h1>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.event_narration) }} />
      </div>
    );
  }
}
export default Event;

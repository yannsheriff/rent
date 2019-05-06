/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Transition.scss';


class Transition extends Component {
  render() {
    const { data } = this.props;

    return (
      <div id="transition">
        <div>
          {' '}
          {data}
          {' '}
        </div>
      </div>
    );
  }
}
export default Transition;

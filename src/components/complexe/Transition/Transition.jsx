/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import visit from 'assets/img/transition/transition.gif';
import './Transition.scss';

class Transition extends Component {
  render() {
    const { data } = this.props;
    console.log(data);

    return (
      <div id="transition">
        <div>
          {' '}
          <img src={visit} alt="" />
          {data}
          {' '}
        </div>
      </div>
    );
  }
}
export default Transition;

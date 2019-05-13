/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Adventure.scss';

/* ILLUSTRATIONS */

// import adventure from 'assets/img/adventure/.gif';

class Adventure extends Component {
  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <div className="card--content card--adventure">
        <h2 className="card--type">Péripétie</h2>
        {/* <img className="card--illu" src={ads} alt="" /> */}
        <h1>{ data.adventure_title }</h1>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.adventure_narration) }} />
      </div>
    );
  }
}

export default Adventure;

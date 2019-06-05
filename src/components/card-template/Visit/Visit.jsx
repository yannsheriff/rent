/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Visit.scss';
import trueStroy from 'assets/img/true-story.svg';

/* ILLUSTRATIONS */

// import good from 'assets/img/visit/';
// import ok from 'assets/img/visit/';
// import bad from 'assets/img/visit/';

class Visit extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  returnIllu(quality) {
    switch (quality) {
      case 'good':
        return this.good;
      case 'ok':
        return this.ok;
      case 'bad':
        return this.bad;
      default:
        return this.ok;
    }
  }

  render() {
    const { data } = this.props;
    return (
      <div className="card--content card--visit">
        <h2 className="card--type">Visite</h2>
        <div className="card--illu--container">
          {/* <img className="card--illu" src={this.returnIllu(data.visit.visit_quality)} alt="" /> */}
          {data.visit.visit_story === 'true'
            && <img className="true-story" src={trueStroy} alt="histoire vrai" />
          }
        </div>

        <h1>{ data.visit.visit_title }</h1>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.visit.visit_description) }} />
      </div>
    );
  }
}

export default Visit;

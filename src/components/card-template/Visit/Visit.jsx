/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Visit.scss';

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
    console.log(data);
    return (
      <div className="card--content card--visit">
        <h2 className="card--type">Visite</h2>
        {/* <img className="card--illu" src={this.returnIllu(data.visit.visit_quality)} alt="" /> */}
        <h1>{ data.visit.visit_title }</h1>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.visit.visit_description) }} />
      </div>
    );
  }
}

export default Visit;

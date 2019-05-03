import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { NounouService } from '../../../services/NounouService';
import Card from '../../basic/Card/Card';
import './Ads.scss';

class Ads extends Component {
  constructor(props) {
    super(props);
    this.flatRefs = [];
  }


  render() {
    const { data } = this.props;
    return (
      <div className="ads">
        <h1>
          {data.title}
          {' '}
          {data.ad_size}
          {' '}
        m²
        </h1>
        {data.ad_source === 'agency'
      && <h3>Agence immobilière</h3>
      }
        {data.ad_source === 'individual'
      && <h3>Particulier</h3>
      }

        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.ad_description) }} />
        <p>
          Dossier recommandé :
          {' '}
          {data.ad_rate}
        </p>
        <p>
          Déjà
          {' '}
          {data.ad_views}
          {' '}
          personnes ont visité cet appartement
        </p>
      </div>
    );
  }
}

export default Ads;

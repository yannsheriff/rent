import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Ads.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Ads extends Component {
  render() {
    // const { data } = this.props;
    const data = {
      title: 'Sublime appartement avec sous-sol',
      ad_size: '50',
      ad_description: 'Sublime appartement de 4 pièces non meublé comportant une imposante pièce voûtée en sous-sol denviron 25m2. Frais de bail à prévoir.',
      ad_source: 'agency',
      ad_rate: '3.5',
      ad_views: '462',
    };
    return (
      <div className="card--content card--ads">
        <h2 className="card--type">Annonce</h2>
        {data.ad_source === 'agency'
        && <h3 className="card--tag ">Agence immobilière</h3>
        }
        {data.ad_source === 'individual'
        && <h3 className="card--tag ">Particulier</h3>
        }
        <h1>
          {data.title}
          {' '}
          {data.ad_size}
          {' '}
        m²
        </h1>

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

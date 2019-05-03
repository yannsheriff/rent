import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Ads.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Ads extends Component {
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

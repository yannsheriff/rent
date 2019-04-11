import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { NounouService } from '../../../services/NounouService';
import Card from '../../basic/Card/Card';
import './Ads.scss';

class Ads extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    next: PropTypes.func,
  }

  static defaultProps = {
    data: [],
    next: () => {},
  }

  constructor(props) {
    super(props);
    this.visitsLeft = props.data;
  }

  visitFlat = () => {
    const { next } = this.props;
    NounouService.newAd({});
    next();
  }

  removeAd = (index) => {
    this.visitsLeft.splice(index, 1);
    this.render();
  }

  render() {
    console.log(this.visitsLeft);
    const annonces = this.visitsLeft.map((element, id) => (
      <Card key={id} swipLeft={() => this.removeAd(id)} swipRight={this.visitFlat}>
        <h1>
          {element.title}
          {' '}
          {element.ad_size}
          {' '}
          m²
        </h1>
        {element.ad_source === 'agency'
        && <h3>Agence immobilière</h3>
        }
        {element.ad_source === 'individual'
        && <h3>Particulier</h3>
        }

        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(element.ad_description) }} />
        <p>
          Dossier recommandé :
          {' '}
          {element.ad_rate}
        </p>
        <p>
          Déjà
          {' '}
          {element.ad_views}
          {' '}
          personnes ont visité cet appartement
        </p>
      </Card>
    ));

    return (
      <div id="ads">
        <p>Ads</p>
        <div className="ads">{ annonces }</div>
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  mainState: state.mainReducer,
});


const componentContainer = connect(
  mapStateToProps,
)(Ads);

export default componentContainer;

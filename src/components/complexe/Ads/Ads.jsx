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
    this.visitsLeft = [...props.data];
    this.flatRefs = [];
  }

  visitFlat = (flat) => {
    const { next } = this.props;
    NounouService.saveAd(flat);
    next();
  }

  removeAd = (index) => {
    this.visitsLeft.splice(index, 1);
    if (!this.visitsLeft.length) {
      this.resetCards();
      this.visitsLeft = [...this.props.data];
    }
    this.render();
  }

  resetCards = () => {
    this.flatRefs.forEach((element, index) => {
      setTimeout(() => { element.resetPosition(); }, index * 100);
    });
  }


  render() {
    const annonces = this.visitsLeft.map((element, id) => (
      <Card
        key={id}
        swipLeft={() => this.removeAd(id)}
        swipRight={() => this.visitFlat(element)}
        onRef={(ref) => { this.flatRefs[id] = ref; }}
        leftChoice="passer"
        rightChoice="visiter"
      >
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
        <div className="ads">
          { annonces }
          <Card>
            <h1>Annonces</h1>
          </Card>
        </div>
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

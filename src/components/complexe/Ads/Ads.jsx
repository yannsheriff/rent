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
    this.visteLeft = [...props.data];
    this.flatRefs = [];
  }

  visitFlat = (id) => {
    const { next } = this.props;
    NounouService.newAd({});
    next();
  }

  removeAd = (index) => {
    this.visteLeft.splice(index, 1);

    if (!this.visteLeft.length) {
      this.resetCards();
      this.visteLeft = [...this.props.data];
    }
    this.render();
  }

  resetCards = () => {
    this.flatRefs.forEach((element, index) => {
      setTimeout(() => { element.resetPosition(); }, index * 200);
    });
  }


  render() {
    const annonces = this.visteLeft.map((element, id) => (
      <Card key={id} swipLeft={() => this.removeAd(id)} swipRight={() => this.visitFlat(id)} onRef={(ref) => { this.flatRefs[id] = ref; }}>
        <h2>{element.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(element.ad_description) }} />
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

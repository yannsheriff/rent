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
  };

  static defaultProps = {
    data: [],
    next: () => {},
  };

  visitFlat = () => {
    const { next } = this.props;
    NounouService.newAd({});
    next();
  }

  render() {
    const { data } = this.props;
    const annonces = data.map((element, id) => (
      <Card data={element} key={id}>
        <h2>{element.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(element.ad_description) }} />
      </Card>
    ));
    return (
      <div id="ads">
        <p>Ads</p>
        <button type="button" onClick={this.visitFlat}>next</button>
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

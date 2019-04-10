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
    this.visteLeft = props.data;
  }

  visitFlat = () => {
    const { next } = this.props;
    NounouService.newAd({});
    next();
  }

  removeAd = (index) => {
    this.visteLeft.splice(index, 1);
    this.render();
  }

  render() {
    const annonces = this.visteLeft.map((element, id) => (
      <Card data={element} key={id} swipLeft={() => this.removeAd(id)} swipRight={this.visitFlat}>
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

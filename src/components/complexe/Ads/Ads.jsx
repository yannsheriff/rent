import React, { Component } from 'react';
import { connect } from 'react-redux';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { NounouService } from '../../../services/NounouService';
import './Ads.scss';


class Ads extends Component {
  visitFlat = () => {
    const { next } = this.props;
    NounouService.newAd({});
    next();
  }

  render() {
    console.log(this.props.data);

    const annonces = this.props.data.map(element => <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(element.ad_description) }} />);
    return (
      <div id="ads">
        <p>Ads</p>
        <button onClick={this.visitFlat}>next</button>
        {/* <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(this.props.data[0].ad_description) }} /> */}
        {annonces}
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

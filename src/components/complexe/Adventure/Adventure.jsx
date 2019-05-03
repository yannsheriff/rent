/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Card from '../../basic/Card/Card';
import './Adventure.scss';

class Adventure extends Component {
  static propTypes = {
    fail: PropTypes.func,
    next: PropTypes.func,
    data: PropTypes.object,
  };

  static defaultProps = {
    fail: () => {},
    next: () => {},
    data: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      haveNextCard: false,
      nextCard: undefined,
    };
  }

  returnNextCard = () => {
    const { data, fail } = this.props;
    const card = (
      <Card swipLeft={fail} swipRight={fail}>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.adventure_back) }} />
      </Card>
    );
    this.setState({ haveNextCard: true, nextCard: card });
  }


  render() {
    const { data } = this.props;

    return (
      <div id="adventure">
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.adventure_narration) }} />
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  status: state.status,
});

const componentContainer = connect(
  mapStateToProps,
)(Adventure);

export default componentContainer;

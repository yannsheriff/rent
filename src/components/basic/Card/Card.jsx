import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { NounouService } from '../../../services/NounouService';
import './Card.scss';

class Card extends Component {
  constructor(props) {
    super(props);
    this.firstTouch = { x: 0, y: 0 };
    this.state = {
      cardPosX: 0,
      cardPosY: 0,
    };
  }

  componentDidMount() {

  }

  dragStart = (e) => {
    this.firstTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  drag = (e) => {
    const translateX = e.touches[0].clientX - this.firstTouch.x;
    const translateY = e.touches[0].clientY - this.firstTouch.y;
    this.setState({ cardPosX: translateX, cardPosY: translateY });
  }

  dragEnd = (e) => {
    this.setState({ cardPosX: 0, cardPosY: 0 });
  }


  render() {
    const { data, children } = this.props;
    const { cardPosX, cardPosY } = this.state;
    console.log(`translate(${cardPosX}, ${cardPosY})`);
    return (
      <div id="card" onTouchStart={this.dragStart} onTouchMove={this.drag} onTouchEnd={this.dragEnd} style={{ transform: `translate(${cardPosX}px, ${cardPosY}px)` }}>
        {children}
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
)(Card);

export default componentContainer;

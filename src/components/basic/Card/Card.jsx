/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Card.scss';

class Card extends Component {
  constructor(props) {
    super(props);
    this.firstTouch = { x: 0, y: 0 };
    this.state = {
      cardPosX: 0,
      cardPosY: 0,
    };
    this.lastTouch = 0;
    this.isValidated = false;
    this.card = React.createRef();
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  componentWillUnmount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  dragStart = (e) => {
    this.card.current.classList.remove('transition');
    this.firstTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  drag = (e) => {
    const translateX = e.touches[0].clientX - this.firstTouch.x;
    const translateY = e.touches[0].clientY - this.firstTouch.y;

    if (translateX > 20) {
      this.isValidated = 'right';
    } else if (translateX < -20) {
      this.isValidated = 'left';
    } else {
      this.isValidated = false;
    }

    this.lastTouch = e.touches[0].clientX;
    this.setState({ cardPosX: translateX, cardPosY: translateY });
  }

  dragEnd = () => {
    const { swipRight, swipLeft } = this.props;
    this.card.current.classList.add('transition');
    if (this.isValidated === 'right') {
      this.setState({ cardPosX: 400, cardPosY: 100 });
      swipRight
        ? swipRight()
        : console.warn('need swipRight to be a function');
    } else if (this.isValidated === 'left') {
      this.setState({ cardPosX: -400, cardPosY: 100 });
      swipLeft
        ? swipLeft()
        : console.warn('need swipLeft to be a function');
    } else {
      this.setState({ cardPosX: 0, cardPosY: 0 });
    }
  }

  resetPosition = () => {
    this.setState({ cardPosX: 0, cardPosY: 0 });
  }


  render() {
    const {
      data, children, leftChoice, rightChoice,
    } = this.props;
    const { cardPosX, cardPosY } = this.state;

    return (
      <div id="card" onTouchStart={this.dragStart} onTouchMove={this.drag} onTouchEnd={this.dragEnd} style={{ transform: `translate(${cardPosX}px, ${cardPosY}px)` }} ref={this.card}>
        {children}
        {leftChoice && rightChoice
        && (
          <div className="bottom">
            <div className={`left ${this.isValidated === 'left' ? 'selected' : ''}`}>{leftChoice}</div>
            <div className={`right ${this.isValidated === 'right' ? 'selected' : ''}`}>{rightChoice }</div>
          </div>
        )
        }
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

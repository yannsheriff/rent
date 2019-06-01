/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-expressions */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { MozartService } from 'services/MozartService';
import './Card.scss';

class Card extends Component {
  static propTypes = {
    data: PropTypes.string,
    swipRight: PropTypes.func,
    swipLeft: PropTypes.func,
    leftChoice: PropTypes.string,
    rightChoice: PropTypes.string,
    onRef: PropTypes.func,
    isLocked: PropTypes.bool,
  }

  static defaultProps = {
    data: '',
    swipRight: () => {},
    swipLeft: () => {},
    leftChoice: '',
    rightChoice: '',
    onRef: () => {},
    isLocked: false,
  }

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
    const { onRef } = this.props;
    if (onRef) {
      onRef(this);
    }
  }

  componentWillUnmount() {
    const { onRef } = this.props;
    if (onRef) {
      onRef(this);
    }
  }

  dragStart = (e) => {
    const { isLocked } = this.props;
    if (!isLocked) {
      // remove transition de carte
      this.card.current.classList.remove('smooth');
      this.firstTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }

  drag = (e) => {
    const { isLocked } = this.props;

    if (!isLocked) {
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
  }

  dragEnd = () => {
    const { swipRight, swipLeft, isLocked } = this.props;
    if (!isLocked) {
      // add transition de carte
      this.card.current.classList.add('smooth');

      if (this.isValidated === 'right') {
        MozartService.interaction('swipe');
        this.setState({ cardPosX: 400, cardPosY: 100 });
        setTimeout(() => {
          swipRight
            ? swipRight()
            : console.warn('need swipRight to be a function');
        }, 200);
      } else if (this.isValidated === 'left') {
        MozartService.interaction('swipe');
        this.setState({ cardPosX: -400, cardPosY: 100 });
        setTimeout(() => {
          swipLeft
            ? swipLeft()
            : console.warn('need swipLeft to be a function');
        }, 200);
      } else {
        this.setState({ cardPosX: 0, cardPosY: 0 });
      }
      this.lastTouch = 0;
      this.isValidated = false;
    }
  }

  resetPosition = () => {
    this.setState({ cardPosX: 0, cardPosY: 0 });
  }

  animatedResetPosition = () => {
    this.card.current.classList.add('smooth');
    this.setState({ cardPosX: 0, cardPosY: 0 }, () => {
      setTimeout(() => this.card.current.classList.remove('smooth'), 300);
    });
  }

  render() {
    const {
      // data
      // eslint-disable-next-line react/prop-types
      children, leftChoice, rightChoice,
    } = this.props;
    const { cardPosX, cardPosY } = this.state;
    const onPressProps = leftChoice && rightChoice ? {} : { onClick: () => { this.isValidated = 'right'; this.dragEnd(); } };
    return (
      <div
        className="card card--main"
        onTouchStart={this.dragStart}
        onTouchMove={this.drag}
        onTouchEnd={this.dragEnd}
        style={{ transform: `translate(${cardPosX}px, ${cardPosY}px)` }}
        ref={this.card}
        {...onPressProps}
      >
        <div className="card--border">
          <div className="card--container">
            {children}
            {leftChoice && rightChoice
        && (
          <div className="card--choice-container">
            <span
              className={`left ${this.isValidated === 'left' ? 'selected' : ''} card--choice`}
              onClick={() => {
                this.isValidated = 'left';
                this.dragEnd();
              }}
            >
              {leftChoice}
            </span>
            <span className="card--choice-separation">|</span>
            <span
              className={`right ${this.isValidated === 'right' ? 'selected' : ''} card--choice`}
              onClick={() => {
                this.isValidated = 'right';
                this.dragEnd();
              }}
            >
              {rightChoice }
            </span>
          </div>
        )
        }
          </div>
        </div>
      </div>
    );
  }
}

export default Card;

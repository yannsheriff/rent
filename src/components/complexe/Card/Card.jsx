/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-expressions */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { MozartService } from 'services/MozartService';
import './Card.scss';

class Card extends PureComponent {
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
    this.dragDidStart = false;
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
      onRef(false);
    }
  }

  dragStart = (e, isDesktop = false) => {
    const x = isDesktop ? e.clientX : e.touches[0].clientX;
    const y = isDesktop ? e.clientY : e.touches[0].clientY;
    const { isLocked } = this.props;
    if (!isLocked) {
      // remove transition de carte
      this.dragDidStart = true;
      this.card.current.classList.remove('smooth');
      this.firstTouch = { x, y };
    }
  }

  drag = (e, isDesktop = false) => {
    const { isLocked } = this.props;
    if (!isLocked && this.dragDidStart) {
      const x = isDesktop ? e.clientX : e.touches[0].clientX;
      const y = isDesktop ? e.clientY : e.touches[0].clientY;
      const translateX = x - this.firstTouch.x;
      const translateY = y - this.firstTouch.y;

      if (translateX > 20) {
        this.isValidated = 'right';
      } else if (translateX < -20) {
        this.isValidated = 'left';
      } else {
        this.isValidated = false;
      }

      this.lastTouch = x;
      this.setState({ cardPosX: translateX, cardPosY: translateY });
    }
  }

  dragEnd = () => {
    const { swipRight, swipLeft, isLocked } = this.props;
    this.dragDidStart = false;

    if (!isLocked) {
      // add transition de carte
      this.card.current.classList.add('smooth');

      if (this.isValidated === 'right') {
        MozartService.interaction('swipe');
        this.setState({ cardPosX: 400, cardPosY: 100 });
        setTimeout(() => {
          if (swipRight) {
            swipRight();
          } else {
            console.warn('need swipRight to be a function');
          }
        }, 200);
      } else if (this.isValidated === 'left') {
        MozartService.interaction('swipe');
        this.setState({ cardPosX: -400, cardPosY: 100 });
        setTimeout(() => {
          if (swipLeft) {
            swipLeft();
          } else {
            console.warn('need swipLeft to be a function');
          }
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

  forceCardSwipe = (side) => {
    this.isValidated = side === 'right' ? 'right' : 'left';
    this.dragEnd();
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { children, leftChoice, rightChoice } = this.props;
    const { cardPosX, cardPosY } = this.state;
    const onPressProps = leftChoice && rightChoice ? {} : { onClick: () => this.forceCardSwipe('right') };
    return (
      <div
        className="card card--main"
        onTouchStart={this.dragStart}
        onMouseDown={e => this.dragStart(e, true)}
        onTouchMove={this.drag}
        onMouseMove={e => this.drag(e, true)}
        onTouchEnd={this.dragEnd}
        onMouseUp={this.dragEnd}
        style={{ transform: `translate(${cardPosX}px, ${cardPosY}px)` }}
        ref={this.card}
        {...onPressProps}
      >
        <div className="card--border">
          <div className="card--container">
            {children}
            {leftChoice && rightChoice
        && (
          <div className={`card--choice-container ${this.isValidated ? 'containe-selected' : ''}`}>
            <span
              className={`left ${this.isValidated === 'left' ? 'selected' : ''} card--choice`}
              onClick={() => this.forceCardSwipe('left')}
            >
              {leftChoice}
            </span>
            <span className="card--choice-separation">|</span>
            <span
              className={`right ${this.isValidated === 'right' ? 'selected' : ''} card--choice`}
              onClick={() => this.forceCardSwipe('right')}
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

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DraggableSkill.scss';

class DraggableSkill extends Component {
  static propTypes = {
    content: PropTypes.object,
    target: PropTypes.object,
    onTargetHover: PropTypes.func,
    onValidation: PropTypes.func,
  }

  static defaultProps = {
    content: {},
    target: {},
    onTargetHover: () => {},
    onValidation: () => {},
  }

  constructor(props) {
    super(props);
    this.firstTouch = { x: 0, y: 0 };
    this.state = {
      posX: 0,
      posY: 0,
      isDragging: false,
    };
    this.userDidDrag = false;
    this.dragDidStart = false;
    this.isValidated = false;
    this.skill = React.createRef();
  }

  componentDidMount() {
    this.skillBounding = this.skill.current.getBoundingClientRect();
    setTimeout(() => {
      if (!this.userDidDrag) {
        this.setState({ bounce: true });
      }
    }, 2500);
  }

  dragStart = (e, isDesktop = false) => {
    this.dragDidStart = true;
    this.skill.current.classList.remove('transition');
    const x = isDesktop ? e.clientX : e.touches[0].clientX;
    const y = isDesktop ? e.clientY : e.touches[0].clientY;
    this.userDidDrag = true;
    this.firstTouch = { x, y };
  }

  drag = (e, isDesktop = false) => {
    const { target, onTargetHover } = this.props;
    if (this.dragDidStart) {
      const clientX = isDesktop ? e.clientX : e.touches[0].clientX;
      const clientY = isDesktop ? e.clientY : e.touches[0].clientY;
      const translateX = clientX - this.firstTouch.x;
      const translateY = clientY - this.firstTouch.y;
      if (
        clientX > target.x && clientX < target.x + target.width
        && clientY > target.y && clientY < target.y + target.width
      ) {
        if (!this.isValidated) {
          onTargetHover(true);
        }
        this.isValidated = true;
      } else {
        if (this.isValidated) {
          onTargetHover(false);
        }
        this.isValidated = false;
      }
      this.setState({
        posX: translateX, posY: translateY, isDragging: true, bounce: false,
      });
    }
  }

  dragEnd = () => {
    const { target, onValidation } = this.props;
    const { x, y, width } = this.skillBounding;
    this.skill.current.classList.add('transition');
    this.dragDidStart = false;

    if (this.isValidated) {
      const targetX = target.x + target.width / 2;
      const targetY = target.y + target.width / 2;
      const finalX = targetX - x - width / 2;
      const finalY = targetY - y - width / 2;
      this.setState({ posX: finalX, posY: finalY }, () => {
        onValidation();
      });
    } else {
      this.setState({ posX: 0, posY: 0, isDragging: false });
      this.isValidated = false;
    }
  }

  render() {
    const { content, dragAnimation } = this.props;
    const {
      posX, posY, isDragging, bounce,
    } = this.state;
    return (
      <div
        onTouchStart={this.dragStart}
        onMouseDown={e => this.dragStart(e, true)}
        onTouchMove={this.drag}
        onMouseMove={e => this.drag(e, true)}
        onTouchEnd={this.dragEnd}
        onMouseUp={this.dragEnd}
        className={`${!isDragging && bounce && dragAnimation ? 'drag' : ''} draggable-skill`}
        style={{ transform: `translate(${posX}px, ${posY}px)`, backgroundImage: `url(${content.img})` }}
        ref={this.skill}
      />
    );
  }
}

export default DraggableSkill;

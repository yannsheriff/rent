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
    };
    this.isValidated = false;
    this.skill = React.createRef();
  }

  componentDidMount() {
    this.skillBounding = this.skill.current.getBoundingClientRect();
  }

  dragStart = (e) => {
    this.skill.current.classList.remove('transition');
    this.firstTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  drag = (e) => {
    const { target, onTargetHover } = this.props;
    const { clientY, clientX } = e.touches[0];
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
    this.setState({ posX: translateX, posY: translateY });
  }

  dragEnd = () => {
    const { target, onValidation } = this.props;
    const { x, y, width } = this.skillBounding;
    this.skill.current.classList.add('transition');

    if (this.isValidated) {
      const targetX = target.x + target.width / 2;
      const targetY = target.y + target.width / 2;
      const finalX = targetX - x - width / 2;
      const finalY = targetY - y - width / 2;
      this.setState({ posX: finalX, posY: finalY }, () => {
        onValidation();
      });
    } else {
      this.setState({ posX: 0, posY: 0 });
      this.isValidated = false;
    }
  }

  render() {
    const { content } = this.props;
    const { posX, posY, bounce } = this.state;
    return (
      <div
        onTouchStart={this.dragStart}
        onTouchMove={this.drag}
        onTouchEnd={this.dragEnd}
        // className={`${bounce ? 'bounce' : ''} draggable-skill`}
        className="draggable-skill"
        style={{ transform: `translate(${posX}px, ${posY}px)`, backgroundImage: `url(${content.img})` }}
        ref={this.skill}
      />
    );
  }
}

export default DraggableSkill;

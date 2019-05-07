/* eslint-disable no-unused-expressions */
import React, { Component, ReactDOM } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './DraggableSkill.scss';

class DraggableSkill extends Component {
  static propTypes = {
    swipRight: PropTypes.func,
    swipLeft: PropTypes.func,
  }

  static defaultProps = {
    swipRight: () => {},
    swipLeft: () => {},
  }

  constructor(props) {
    super(props);
    this.firstTouch = { x: 0, y: 0 };
    this.state = {
      posX: 0,
      posY: 0,
      pos: false,
    };
    this.lastTouch = 0;
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
    this.lastTouch = e.touches[0].clientX;
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
      this.lastTouch = 0;
      this.isValidated = false;
    }
  }

  resetPosition = () => {
    this.setState({ posX: 0, posY: 0 });
  }

  render() {
    const {
      content,
    } = this.props;
    const { posX, posY } = this.state;

    return (
      <div
        id="draggable-skill"
        onTouchStart={this.dragStart}
        onTouchMove={this.drag}
        onTouchEnd={this.dragEnd}
        style={{ transform: `translate(${posX}px, ${posY}px)` }}
        ref={this.skill}
      >
        {content}
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
)(DraggableSkill);

export default componentContainer;

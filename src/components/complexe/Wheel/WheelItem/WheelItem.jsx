/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import './WheelItem.scss';

class WheelItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: null,
      pos: this.calculatePos(props.index),
      timing: this.calculateTiming(props.index, props.timing),
      ease: 'linear',
      opacity: 1,
    };

    this.myref = React.createRef();
  }

  componentDidMount() {
    const { onRef } = this.props;
    if (onRef) {
      onRef(this);
    }
    this.start();
  }

  calculatePos = (index) => {
    const { size, margin } = this.props;
    return index * (size / 2 + margin);
  };

  calculateTiming = (index, timing) => {
    const { size, margin } = this.props;
    return (index + 1) * (size + margin) * timing;
  };

  start = () => {
    const { size, margin } = this.props;
    setTimeout(() => {
      this.setState({ pos: -(size * 2 + margin) });
    }, 50);
  }

  stop = (pos, selected = false) => {
    this.setState({ pos: pos + 50, ease: 'ease-out', opacity: selected ? 1 : 0.15 });
  }


  render() {
    const {
      data, size, field, img,
    } = this.props;
    const {
      pos, timing, ease, opacity,
    } = this.state;

    const component = img ? (<img src={data[field]} alt="" />) : (
      <p>
        {' '}
        {data[field]}
        {' '}
      </p>
    );
    const style = {
      transform: `translateY(${-pos + 50}px)`,
      transition: `${timing}ms ${ease}`,
      width: size,
      height: size,
      boxSizing: 'border-box',
      backgroundColor: img ? 'transparent' : 'white',
      border: img ? 'transparent' : '1px solid black',
      opacity,
    };
    return (
      <div id="wheel-item" style={style} ref={this.myref}>
        {component}
      </div>
    );
  }
}

export default WheelItem;

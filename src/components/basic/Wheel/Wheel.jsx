/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import './Wheel.scss';
import { stringify } from 'querystring';
import WheelItem from './WheelItem/WheelItem';

class Wheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: null,
      items: [],
    };
    this.ref = [];
    this.size = 120; // size of the circles
    this.margin = 20; // margin between circles
    this.requestStop = false; // if stop requested
    this.itemsLength = 11; // number of items
    this.timing = 2.5; // speed
  }

  // Create ref for top component
  componentDidMount() {
    // this.start();
    const { onRef } = this.props;
    if (onRef) {
      onRef(this);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (stringify(nextProps.data) !== stringify(this.state.data)) {
      this.setState({
        data: nextProps.data,
        fieldToShow: nextProps.fieldToShow,
        img: nextProps.img,
      });
      //
      // () => this.start());
    }
  }

  start = () => {
    this.requestStop = false;
    this.setState({ items: this.generateItems() }, () => { // when items are generated
      console.log(this.state.items);
      this.creatInterval = setInterval(() => { // set loop to remove last items and replace it
        if (this.requestStop) { // if stop requested
          clearInterval(this.creatInterval); // clear loop
          this.stop(); // and send stop to wheel items
        } else {
          this.changeItem(); // else remove last items and replace it
        }
      }, (this.size + this.margin) * this.timing);
    });
  }

  changeItem = () => {
    const { items } = this.state;
    const remove = items.slice(1);
    this.ref.shift();
    const add = [...remove, this.generateItem(this.itemsLength - 1)];
    this.setState({ items: add });
  }

  generateItems = () => {
    const items = [];
    for (let index = 0; index < this.itemsLength; index++) {
      items.push(this.generateItem(index));
    }
    return items;
  }

  generateItem = (index) => {
    const { data, fieldToShow, img } = this.props;
    const unix = Date.now();
    const rand = Math.round(Math.random() * ((data.length - 1)));
    const randKey = Math.round(Math.random() * (1000));
    const key = `${index}${unix}${randKey}`;
    const randData = data[rand];
    return (
      <WheelItem
        data={randData}
        index={index}
        key={key}
        timing={this.timing}
        size={this.size}
        margin={this.margin}
        field={fieldToShow}
        img={img}
        onRef={(ref) => { this.ref[index] = ref; }}
      />
    );
  }

  select = () => {
    this.requestStop = true;
  }

  stop = () => {
    const center = window.innerWidth / 2 - 60;
    const total = this.size + this.margin;
    const middle = Math.floor(this.itemsLength / 2);
    const { onDataSelection } = this.props;

    for (let index = 0; index < this.itemsLength; index++) {
      if (index === middle) {
        this.ref[index].stop(center, true);
        onDataSelection(this.ref[index].props.data);
      } else if (index < middle) {
        this.ref[index].stop(center - total * (middle - index));
      } else {
        this.ref[index].stop(center + total * (index - middle));
      }
    }
  }

  render() {
    const { items } = this.state;
    return (
      <div id="wheel">
        {items}
      </div>
    );
  }
}

export default Wheel;

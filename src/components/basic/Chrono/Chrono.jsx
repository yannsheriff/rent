/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import './Chrono.scss';

class Chrono extends Component {
  constructor(props) {
    super(props);

    this.state = {
      second: 300,
      // percentage: 100,
    };
    this.timer = 300;
  }

  // endGame = () => {
  //   const { end } = this.props;
  //   clearInterval(this.chrono);
  //   end('chrono');
  // };

  componentDidMount() {
    const endTime = moment()
      .add(this.timer, 'seconds')
      .toDate()
      .getTime();

    this.chrono = setInterval(() => {
      const now = new Date().getTime();
      const sub = endTime - now;
      const seconds = sub / 1000;
      // const percentage = (seconds / this.timer) * 1;
      this.setState({ second: seconds });

      if (sub <= 0) {
        this.endGame();
      }
    }, 200);
  }

  render() {
    const { second } = this.state;
    return (
      <div>
        <p>{chrono(second)}</p>
        {/* <div
          className="indicator"
          style={{ transform: `scale(${percentage}, 1)` }}
        /> */}
      </div>
    );
  }
}

export function chrono(secNum) {
  const hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - hours * 3600) / 60);
  let seconds = Math.floor(secNum - hours * 3600 - minutes * 60);
  minutes = minutes > 0 ? (minutes > 9 ? `${minutes}:` : `0${minutes}:`) : '00:';
  seconds = seconds > 0 ? (seconds > 9 ? `${seconds}` : `0${seconds}`) : '00';

  return minutes + seconds;
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  mainState: state.mainReducer,
});

const componentContainer = connect(
  mapStateToProps,
)(Chrono);

export default componentContainer;

/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import './Header.scss';
import { endGame } from '../../../redux/actions/steps';

class Header extends Component {
  static propTypes = {
    end: PropTypes.func,
  };

  static defaultProps = {
    end: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      second: 300,
      percentage: 100,
    };

    this.timer = 300;
  }

  componentDidMount() {
    const endTime = moment()
      .add(this.timer, 'seconds')
      .toDate()
      .getTime();

    this.chrono = setInterval(() => {
      const now = new Date().getTime();
      const sub = endTime - now;
      const seconds = sub / 1000;
      const percentage = (seconds / this.timer) * 1;
      this.setState({ second: seconds, percentage });

      if (sub <= 0) {
        this.endGame();
      }
    }, 200);
  }

  endGame = () => {
    const { end } = this.props;

    clearInterval(this.chrono);
    end('chrono');
  };

  render() {
    const { second, percentage } = this.state;
    return (
      <div id="header">
        <p>{chrono(second)}</p>
        <div
          className="indicator"
          style={{ transform: `scale(${percentage}, 1)` }}
        />
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

const mapDispatchToProps = dispatch => ({
  end: (reason) => {
    dispatch(endGame(reason));
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default componentContainer;

export function chrono(secNum) {
  const hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - hours * 3600) / 60);
  let seconds = Math.floor(secNum - hours * 3600 - minutes * 60);
  minutes = minutes > 0 ? (minutes > 9 ? `${minutes}:` : `0${minutes}:`) : '00:';
  seconds = seconds > 0 ? (seconds > 9 ? `${seconds}` : `0${seconds}`) : '00';
  return minutes + seconds;
}

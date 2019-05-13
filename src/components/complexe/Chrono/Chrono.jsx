/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Chrono.scss';
import { humanizeMonth } from 'vendors/humanize';

class Chrono extends Component {
  static propTypes = {
    didExpire: PropTypes.func,
  };

  static defaultProps = {
    didExpire: (reason) => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      month: null,
    };
    this.timer = props.time;
    this.initialTimer = props.time;
    this.month = 6;
  }

  componentDidMount() {
    this.endTime = moment()
      .add(this.timer, 'seconds')
      .toDate()
      .getTime();
    this.chrono = setInterval(() => {
      const now = new Date().getTime();
      const sub = this.endTime - now;
      const seconds = sub / 1000;
      this.secondPassed = this.timer - seconds;
      const monthInSec = this.month * 31 * 24 * 60 * 60;
      const leftMonthInSec = seconds * monthInSec / this.initialTimer;
      this.setState({ month: leftMonthInSec });
      if (sub <= 0) { this.endGame(); }
    }, 100);
  }

  componentWillReceiveProps(nextProps) {
    this.timer = nextProps.time;
    const timeleft = nextProps.time - this.secondPassed;
    this.endTime = moment()
      .add(timeleft, 'seconds')
      .toDate()
      .getTime();
  }


  endGame = () => {
    const { didExpire } = this.props;
    clearInterval(this.chrono);
    didExpire('chrono');
  };

  render() {
    const { month } = this.state;
    const date = humanizeMonth(month);
    return (
      <div className={`chrono fade ${date.month === '04' ? 'urgent' : ''}`}>
        <div>
          <span className="chrono--nb">{ date.month }</span>
          <p className="chrono--text">MOIS</p>
        </div>
        <div>:</div>
        <div>
          <span className="chrono--nb">{ date.days }</span>
          <p className="chrono--text">JOURS</p>
        </div>
        <div>:</div>
        <div>
          <span className="chrono--nb">{ date.hours }</span>
          <p className="chrono--text">HEURES</p>
        </div>
      </div>
    );
  }
}

export default Chrono;

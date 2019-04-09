import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Header.scss';


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      second: 300,
      percentage: 100,
    };
  }

  componentDidMount() {
    const endTime = moment()
      .add(5, 'minutes')
      .toDate()
      .getTime();

    this.chrono = setInterval(() => {
      const now = new Date().getTime();
      const sub = endTime - now;
      const seconds = sub / 1000;
      const percentage = (seconds / 300) * 1;
      this.setState({ second: seconds, percentage });

      if (sub <= 0) {
        this.soundIsPlaying = true;
        clearInterval(this.chrono);
      }
    }, 200);
  }

  render() {
    const { second, percentage } = this.state;
    return (
      <div id="header">
        <p>{chrono(second)}</p>
        <div className="indicator" style={{ transform: `scale(${percentage}, 1)` }} />
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
)(Header);

export default componentContainer;

export function chrono(sec_num) {
  const hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60));
  minutes = minutes > 0 ? minutes > 9 ? `${minutes}:` : `0${minutes}:` : '00:';
  seconds = seconds > 0 ? seconds > 9 ? `${seconds}` : `0${seconds}` : '00';
  return minutes + seconds;
}

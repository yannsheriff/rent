/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.scss';
import { endGame, setFinalTime } from 'redux/actions/steps';
import { Chrono, ProgressBar } from '../../complexe';

class Header extends Component {
  static propTypes = {
    end: PropTypes.func,
  };

  static defaultProps = {
    end: () => {},
  };

  triggerEnd = (reason) => {
    const { end } = this.props;
    end(reason);
  }

  render() {
    const { profil, setTime } = this.props;

    return (
      <div id="header" className="layout--header">
        {/* <ProgressBar /> */}
        <Chrono didExpire={this.triggerEnd} time={profil.time} timeToSet={time => setTime(time)} />
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  mainState: state.mainReducer,
  profil: state.profilReducer,
});

const mapDispatchToProps = dispatch => ({
  end: (reason) => {
    dispatch(endGame(reason));
  },
  setTime: (time) => {
    dispatch(setFinalTime(time));
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default componentContainer;

/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.scss';
import { endGame } from 'redux/actions/steps';
import Chrono from '../../complexe/Chrono/Chrono';

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
    const { profil } = this.props;

    return (
      <div id="header" className="layout--header">
        <Chrono didExpire={this.triggerEnd} time={profil.time} />
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
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default componentContainer;

/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.scss';
import { endGame } from 'redux/actions/steps';
import Chrono from '../../basic/Chrono/Chrono';

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
    return (
      <div id="header">
        <Chrono didExpire={this.triggerEnd} />
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../logo.svg';
import { gameIsSetUp } from '../../redux/actions/steps';
import './Setup.scss';

class Setup extends Component {
  render() {
    const { didSetUp } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Setup Screen</p>
          <a className="App-link" onClick={() => didSetUp()}>
            set Up
          </a>
        </header>
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  step: state.step,
});

const mapDispatchToProps = dispatch => ({
  didSetUp: () => {
    dispatch(gameIsSetUp());
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setup);

export default componentContainer;

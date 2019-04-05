import React, { Component } from 'react';
import logo from '../../logo.svg';
import { connect } from 'react-redux';
import { gameIsSetUp } from '../../redux/actions/steps';
import './Setup.scss';


class Setup extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Setup Screen 
          </p>
          <a
            className="App-link"
            onClick={() => this.props.didSetUp()}
          >
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
    step: state.step
  });
  
  const mapDispatchToProps = dispatch => ({
    didSetUp: () => {
      dispatch(gameIsSetUp());
    },
  });
  
  const componentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Setup);
  
  export default componentContainer;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlayScreen.scss';

// components 
import Header from "../../components/Header/Header";
import Profile from "../../components/Profile/Profile";
import StepDisplay from "../../components/StepDisplay/StepDisplay";


class PlayScreen extends Component {
  render() {
    console.log(this.props.mainState)
    return (
      <div className="App">
        <Header />
        <StepDisplay />
        <Profile />
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
  )(PlayScreen);
  
  export default componentContainer;


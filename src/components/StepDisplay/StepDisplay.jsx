
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StepDisplay.scss';


class Header extends Component {

  constructor(props) {
    super(props)

    this.state = {
      actualStep: 'annonces'
    }
  }

  //  ---- STEPS ----
  // - annonces 
  // - visite 
  // - peripethie 
  // - skill 
  // - remise en question 
  // - event 


  returnActualStep = () => {
    return 'A'
  }

  returnActualStep = () => {
    switch (this.state.actualStep) {
      case "value":
        
        break;
    
      default:
        break;
    }
  }
  
  failStep = () => {

  }

  render() {
    // const actualStep = this.returnActualStep()

    return (
      <div id="steps">
        <p>{this.state.actualStep}</p>
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


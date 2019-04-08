


import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Profile.scss';


class Header extends Component {
  render() {

    return (
      <div id="profile">
        <p>profile</p>
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


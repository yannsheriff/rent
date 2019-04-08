import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss';


class Header extends Component {
  render() {
    return (
      <div id="header">
        <p>header</p>
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

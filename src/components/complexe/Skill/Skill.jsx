import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Skill.scss';


class Skill extends Component {
  render() {
    return (
      <div id="skill">
        <p>Skill</p>
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
)(Skill);

export default componentContainer;

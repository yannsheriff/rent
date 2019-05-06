/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { endGame } from '../../../redux/actions/steps';
import './Skill.scss';


class Skill extends Component {
  static propTypes = {
    data: PropTypes.object,
    profil: PropTypes.object,
    endGame: PropTypes.func,
  };

  static defaultProps = {
    data: {},
    profil: {},
    endGame: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      endNaration: false,
      didWin: false,
    };
  }

  chooseSkill = (skill) => {
    const { data, next } = this.props;
    console.log('TCL: Skill -> chooseSkill -> skill', skill);
    console.log('TCL: Skill -> chooseSkill -> data.content.adventure_skill', data.content.adventure_skill);
    if (skill === data.content.adventure_skill) {
      next(true);
    } else {
      next(false);
    }
  }

  render() {
    const { profil, data } = this.props;
    const { endNaration, didWin } = this.state;
    const skills = profil.skills.map(element => (
      <button type="button" onClick={() => this.chooseSkill(element.id)}>
        {element.title}
      </button>
    ));
    return (
      <div id="skill">
        <p>Quel skill voulez vous choisir pour Faire cette action ? </p>
        <p>
          (Le bon skill à avoir est
          {' '}
          { data.content.adventure_skill }
          )
        </p>
        {skills}
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  profil: state.profilReducer,
});

const mapDispatchToProps = dispatch => ({
  endGame: (win) => {
    dispatch(endGame(win));
  },
});


const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Skill);

export default componentContainer;

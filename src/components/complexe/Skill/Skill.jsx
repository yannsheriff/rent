import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { endGame } from '../../../redux/actions/steps';
import './Skill.scss';


class Skill extends Component {
  static propTypes = {
    data: PropTypes.object,

  };

  static defaultProps = {
    // fail: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      endNaration: false,
      didWin: false,
    };
  }

  chooseSkill = (skill) => {
    const { data } = this.props;
    if (skill === data.adventure_skill) {
      this.setState({ endNaration: data.adventure_victory, didWin: true });
    } else {
      this.setState({ endNaration: data.adventure_defeat });
    }
  }

  render() {
    const { profil, endGame, data } = this.props;
    const { endNaration, didWin } = this.state;
    const skills = profil.skills.map(element => (
      <button type="button" onClick={() => this.chooseSkill(element.title)}>
        {element.title}
      </button>
    ));
    return (
      <div id="skill">
        <p>Quel skill voulez vous choisir pour Faire cette action ? </p>
        <p>
          (Le bon skill à avoir est
          {' '}
          { data.adventure_skill }
          )
        </p>
        {!endNaration && skills}
        {endNaration
         && (
         <div>
           <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(endNaration) }} />
           <button onClick={() => { endGame(didWin ? 'win' : 'loose'); }}>next </button>
         </div>
         )
        }
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

/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { endGame } from '../../../redux/actions/steps';
import './Skill.scss';
import DraggableSkill from '../../basic/DraggableSkill/DraggableSkill';

class Skill extends Component {
  static propTypes = {
    data: PropTypes.object,
    profil: PropTypes.object,
    endGame: PropTypes.func,
    receptacleIsHovered: false,
    receptacleIsSelected: false,
  };

  static defaultProps = {
    data: {},
    profil: {},
    endGame: () => {},
  };

  constructor(props) {
    super(props);
    this.skillsRef = [];
    this.state = {
      endNaration: false,
      didWin: false,
      receptaclePos: false,
    };
  }

  chooseSkill = (skill) => {
    const { data, next } = this.props;
    if (skill === data.content.adventure_skill) {
      next(true);
    } else {
      next(false);
    }
  }

  targetIsHovered = (isHover) => {
    isHover
      ? this.setState({ receptacleIsHovered: true })
      : this.setState({ receptacleIsHovered: false });
  }

  skillValidation = (index) => {
    const { profil } = this.props;
    const choosenSkill = profil[index];
    this.setState({ receptacleIsSelected: true }, () => {
      setTimeout(() => this.chooseSkill(choosenSkill), 700);
    });
  }


  render() {
    const { profil, data } = this.props;
    const { receptaclePos, receptacleIsHovered, receptacleIsSelected } = this.state;
    const skills = profil.skills.map((element, index) => (
      <DraggableSkill
        target={receptaclePos}
        content={element.title}
        onTargetHover={this.targetIsHovered}
        onValidation={() => { this.skillValidation(index); }}
      />
    ));
    return (
      <div id="skill">
        <p>Quel skill voulez vous choisir pour Faire cette action ? </p>
        { data.content.adventure_skill }
        <div className="container">
          <div
            className={`receptacle ${receptacleIsHovered ? 'hover' : ''} ${receptacleIsSelected ? 'selected' : ''}`}
            ref={(el) => {
              if (el && !receptaclePos) {
                const element = el.getBoundingClientRect();
                this.setState({
                  receptaclePos: {
                    x: element.x,
                    y: element.y,
                    width: element.width,
                  },
                });
              }
            }}
          />
          <div className="skills-container">
            {skills}
          </div>
        </div>
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

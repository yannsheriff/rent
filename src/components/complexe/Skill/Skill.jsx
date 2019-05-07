/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Skill.scss';
import DraggableSkill from '../../basic/DraggableSkill/DraggableSkill';

class Skill extends Component {
  static propTypes = {
    data: PropTypes.object,
    profil: PropTypes.object,
    next: PropTypes.func,
  };

  static defaultProps = {
    data: {},
    profil: {},
    next: () => {},
  };

  constructor(props) {
    super(props);
    this.skillsRef = [];
    this.state = {
      receptaclePos: false,
      receptacleIsHovered: false,
      receptacleIsSelected: false,
    };
  }

  assignBounding = (el) => {
    const { receptaclePos } = this.state;
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
  }

  targetIsHovered = (isHover) => {
    if (isHover) {
      this.setState({ receptacleIsHovered: true });
    } else {
      this.setState({ receptacleIsHovered: false });
    }
  }

  skillValidation = (index) => {
    const { profil } = this.props;
    const choosenSkill = profil.skills[index].id;
    this.setState({ receptacleIsSelected: true }, () => {
      setTimeout(() => this.chooseSkill(choosenSkill), 700);
    });
  }

  chooseSkill = (skill) => {
    const { data, next } = this.props;
    if (skill === data.content.adventure_skill) {
      next(true);
    } else {
      next(false);
    }
  }


  render() {
    const { profil, data } = this.props;
    const { receptaclePos, receptacleIsHovered, receptacleIsSelected } = this.state;
    const classes = `${receptacleIsHovered ? 'hover' : ''} ${receptacleIsSelected ? 'selected' : ''}`;
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
          <div className={`receptacle ${classes}`} ref={this.assignBounding} />
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

const componentContainer = connect(
  mapStateToProps,
)(Skill);

export default componentContainer;

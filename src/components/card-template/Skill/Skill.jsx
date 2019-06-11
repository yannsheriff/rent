/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Skill.scss';
import { DraggableSkill } from 'components/complexe';
import { MozartService } from 'services/MozartService';
import skillTarget from 'assets/img/skillTarget.svg';

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
    MozartService.interaction('skill');
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
    let skills = [];

    skills = profil.skills.map((element, index) => (
      <div key={element.id}>
        <DraggableSkill
          target={receptaclePos || {}}
          dragAnimation={index === 0}
          content={element}
          onTargetHover={this.targetIsHovered}
          onValidation={() => { this.skillValidation(index); }}
        />
        <p>{element.title}</p>
      </div>
    ));

    return (
      <div id="skill" className="container">
        <div>
          <h1 className="card--title">
            { data.content.adventure_first_choice }
          </h1>
          <p>Une de vos capacités peut peut-être vous aider à vous tirer de cette situation…  </p>
        </div>
        <div className={`receptacle ${classes}`} ref={this.assignBounding}>
          {/* {receptaclePos && (
          <svg>
            <circle cx="50%" cy="50%" r={receptaclePos.width - receptaclePos.width / 100 * 50} />
          </svg>
          )} */}
          <img src={skillTarget} alt="skill" />
        </div>
        <div className="skills-container">
          {skills}
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

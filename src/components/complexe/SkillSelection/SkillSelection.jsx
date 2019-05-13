/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import skills from 'assets/content/skills';
import { updateSkills } from 'redux/actions/profil';
import './SkillSelection.scss';

class SkillSelection extends Component {
  static propTypes = {
    updateSkill: PropTypes.func,
    next: PropTypes.func,
  };

  static defaultProps = {
    updateSkill: () => {},
    next: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: [],
    };
  }

  selectSkill = (skill) => {
    const { next, updateSkill } = this.props;
    this.setState(state => ({
      selected: state.selected.concat(skill),
    }), () => {
      const { selected } = this.state;
      if (selected.length > 1) {
        updateSkill(selected);
        setTimeout(() => { next(); }, 100);
      }
    });
  }

  unselectSkill = (skill) => {
    const { selected } = this.state;
    const newArray = selected.filter(el => el.id !== skill.id);
    this.setState({
      selected: newArray,
    });
  }

  isSkillSelected = (skill) => {
    const { selected } = this.state;
    if (selected.length) {
      const isSelected = selected.filter(el => el.id === skill.id);
      return !!isSelected.length;
    }
    return false;
  }

  /* HTML */

  returnSkill = (skill, isSelected) => (
    <div
      className={`skill-list ${isSelected ? 'selected' : ''}`}
      onClick={() => {
        isSelected
          ? this.unselectSkill(skill)
          : this.selectSkill(skill);
      }}
    >
      <img src={skill.img} alt="" />
      <h3>{skill.title}</h3>
    </div>
  )


  render() {
    const skill = skills.map((skill) => {
      const isSelected = this.isSkillSelected(skill);
      return this.returnSkill(skill, isSelected);
    });
    return (
      <div id="skillSelection" className="skills-selection">
        <h1>
          Choisissez 2 capacités qui vous seront utiles
        </h1>
        <div className="skills-container">
          {skill}
        </div>
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({ mainState: state.mainReducer });

const mapDispatchToProps = dispatch => ({
  updateSkill: (e) => {
    dispatch(updateSkills(e));
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SkillSelection);

export default componentContainer;

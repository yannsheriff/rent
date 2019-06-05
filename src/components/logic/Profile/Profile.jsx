/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Profile.scss';
import star from 'assets/img/icons/icon_star.svg';

class Header extends Component {
  static propTypes = {
    profil: PropTypes.object,
  };

  static defaultProps = {
    profil: {},
  };

  constructor(props) {
    super(props);
    this.status = React.createRef();
    this.budget = React.createRef();
    this.origin = React.createRef();
    this.score = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.profil !== prevProps.profil) {
      if (this.props.profil.status !== prevProps.profil.status) {
        this.status.current.classList.add('bounce');
      }
      if (this.props.profil.budget !== prevProps.profil.budget) {
        this.budget.current.classList.add('bounce');
      }
      if (this.props.profil.origin !== prevProps.profil.origin) {
        this.origin.current.classList.add('bounce');
      }
      if (this.props.profil.score !== prevProps.profil.score) {
        this.score.current.classList.add('bounce');
      }
    }
  }


  render() {
    const { profil } = this.props;
    const {
      budget, origin, status, score, premium,
    } = profil;
    console.log(profil);

    return (
      <div id="profile" className="layout--profile">
        <div className="profile">
          <div className="profile--items score" ref={this.score}>
            <img src={star} alt="score star" />
            <p className="card--choice">{score}</p>
          </div>
          <div ref={this.status} className={`profile--items status ${premium ? 'premium' : ''}`}>
            <div className="round">
              <img src={status.picto} alt="situation pictogram" />
            </div>
          </div>
          <div className="profile--items origin" ref={this.origin}>
            <div className="round">
              <p>{origin.flag}</p>
            </div>
          </div>
          <div className="profile--items budget" ref={this.budget}>
            <div className="round">
              <img src={budget.picto} alt="budget pictogram" />
            </div>
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

const componentContainer = connect(mapStateToProps)(Header);

export default componentContainer;

/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ProfileRecap.scss';

class ProfileRecap extends Component {
  static propTypes = {
    next: PropTypes.func,
  };

  static defaultProps = {
    next: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      canNext: false,
    };
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ canNext: true }); }, 100);
  }

  nextStep = () => {
    const { canNext } = this.state;
    const { next } = this.props;
    if (canNext) {
      next();
    }
  }

  render() {
    const { canNext } = this.state;
    const { profil } = this.props;
    const {
      budget, origin, status, score,
    } = profil;

    const Star = props => (
      <svg
        className="profile-recap--star"
        x="0px"
        y="0px"
        viewBox="0 0 45 45"
        xmlSpace="preserve"
        {...props}
      >
        <g id="UI">
          <g id="HUTTE_UI-kit_atomes" transform="translate(-100.000000, -810.000000)">
            <path
              fill="#fff"
              id="icon_star"
              d="M122.5,849.7l-13,4.2c-0.5,0.2-1.1-0.1-1.2-0.6c0-0.1,0-0.2,0-0.3l0-13.7l-8-11.1c-0.3-0.4-0.2-1,0.2-1.4
              c0.1-0.1,0.2-0.1,0.3-0.1l13-4.3l8.1-11c0.3-0.4,0.9-0.5,1.4-0.2c0.1,0.1,0.2,0.1,0.2,0.2l8.1,11l13,4.3c0.5,0.2,0.8,0.7,0.6,1.2
              c0,0.1-0.1,0.2-0.1,0.3l-8,11.1l0,13.7c0,0.5-0.4,1-1,1c-0.1,0-0.2,0-0.3,0L122.5,849.7z"
            />
          </g>
        </g>
      </svg>
    );

    return (
      <div className="profile-recap" onClick={() => this.nextStep()}>
        <div className="profile-recap--container">
          <h1>
            Vous cherchez un logement
            {' '}
            <span className="lowercase">
              { status.title }
              ,
            </span>
            {' '}
            êtes d'origine
            {' '}
            { origin.title }
            {' '}
            avec un budget
            {' '}
            <span className="lowercase">
              { budget.title }
            </span>
            {'.'}
          </h1>
        </div>

        <div className="profile-recap--rate">
          <Star className="star small" />
          <Star className="star medium" />
          <div className="star big">
            <div>
              <span className="score">
                { score }
              </span>
            </div>
            <Star />
          </div>
          <Star className="star medium" />
          <Star className="star small" />
        </div>

        <div className="profile-recap--text">
          <p>
            La note ci-dessus, calculée d’après votre profil, représente la note de votre dossier de location.
          </p>
        </div>

        {canNext
            && (
            <p className="intro--info">Toucher pour continuer</p>
            )
        }
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({ profil: state.profilReducer });

const componentContainer = connect(
  mapStateToProps,
)(ProfileRecap);

export default componentContainer;

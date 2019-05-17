/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NounouService } from '../../services/NounouService';
import { SocrateService } from '../../services/SocrateService';
import './EndScreen.scss';


class App extends Component {
  static propTypes = {
    step: PropTypes.object,
  };

  static defaultProps = {
    step: false,
  };

  constructor(props) {
    super(props);
    const recap = NounouService.getRecap();
    this.state = {
      flat: recap.actualFlat,
      totalVisits: recap.totalSeenAds,
      generalRecap: false,
    };
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { step, profil } = nextProps;
    if (step.victory !== undefined && step.finalTime) {
      const recap = NounouService.getRecap();
      const formatedSkills = profil.skills.map(element => element.id);
      this.handleRecap(step.finalTime, step.victory, recap.totalSeenAds, formatedSkills);
    }
  }

  async handleRecap(time, win, ads, skills) {
    await SocrateService.sendRecap(time, win, ads, skills);
    const recaps = await SocrateService.getGeneralRecap();
    console.log('TCL: App -> componentWillReceiveProps -> recap', recaps);
    this.setState({ generalRecap: recaps.data.data });
  }

  render() {
    const { step } = this.props;
    const { flat, totalVisits, generalRecap } = this.state;
    const winPercent = Math.floor(generalRecap.totalWins / generalRecap.totalGames * 100);
    return (
      <div id="end">
        <h1>
          {step.end === 'win' ? 'Victoire !' : 'Défaite :(' }
        </h1>
        <div className="end-recap">
          <h2>Recap :</h2>
          Pour vivre dans un appartement {` ${flat.visit.visit_recap} `},
          vous avez visité {` ${totalVisits} `} apparts en {Math.floor(step.finalTime)} secondes.
          <ul>
            <li />
          </ul>

          { generalRecap
          && (
          <div>
            <h2>Users data : </h2>
            <p> le pourcentage de victoire est de {winPercent} %.</p>
            <p> les joueurs visites en moyenne {Math.floor(generalRecap.avgFlat)} appartements.</p>
            <p> Le temps moyen d'une partie est de {Math.floor(generalRecap.avgTime)} secondes.</p>
          </div>
          )
          }
        </div>
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  step: state.stepReducer,
  profil: state.profilReducer,
});

const componentContainer = connect(mapStateToProps)(App);

export default componentContainer;

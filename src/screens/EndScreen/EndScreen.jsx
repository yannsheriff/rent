/* eslint-disable class-methods-use-this */
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
      visitChoiceStats: {},
      adventureChoiceStats: {},
    };

    this.generateData = false;
  }

  componentDidMount() {
    this.handleDataOnMount(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.handleDataOnMount(nextProps);
  }

  handleDataOnMount = (props) => {
    const { step, profil } = props;
    if (step.victory !== undefined && step.finalTime && !this.generateData) {
      this.generateData = true;
      const recap = NounouService.getRecap();
      const formatedSkills = profil.skills.map(element => element.id);
      this.generalRecap(step.finalTime, step.victory, recap.totalSeenAds, formatedSkills, profil);
      this.choiceRecap(recap);
    }
  }

  async generalRecap(time, win, ads, skills, profil) {
    await SocrateService.sendRecap({
      time,
      isVictory: win,
      totalFlat: ads,
      skills,
      origin: profil.origin.id,
      budget: profil.budget.id,
      status: profil.status.id,
      score: profil.score,
    });
    const recaps = await SocrateService.getGeneralRecap();
    this.setState({ generalRecap: recaps.data.data });
  }

  async choiceRecap(recap) {
    const { data: visitResponse } = await SocrateService.getCardStat(recap.actualFlat.visit.id);
    const visit = { ...visitResponse.data, ...recap.actualFlat.visit };
    const { data: adventureResponse } = await SocrateService.getCardStat(recap.adventure.id);
    const adventure = { ...adventureResponse.data, ...recap.adventure };
    this.setState({ visitChoiceStats: visit, adventureChoiceStats: adventure });
  }

  render() {
    const { step } = this.props;
    const {
      flat, totalVisits, generalRecap, visitChoiceStats, adventureChoiceStats,
    } = this.state;
    const winPercent = Math.floor(generalRecap.totalWins / generalRecap.totalGames * 100);
    const visitChoice = Math.floor(visitChoiceStats.accept / visitChoiceStats.total * 100);
    const adventureChoice = Math.floor(adventureChoiceStats.accept / adventureChoiceStats.total * 100);
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
            <p> les joueurs visitent en moyenne {Math.floor(generalRecap.avgFlat)} appartements.</p>
            <p> Le temps moyen d'une partie est de {Math.floor(generalRecap.avgTime)} secondes.</p>
          </div>
          )
          }
          { visitChoiceStats && adventureChoiceStats
          && (
          <div>
            <h2>Your choices : </h2>
            <p> Comme  {visitChoice}% des utilisateurs vous avez pris un appartement {` ${flat.visit.visit_recap} `}</p>
            <p> Comme  {adventureChoice}% des utilisateurs vous avez ...</p>
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

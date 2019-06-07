/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './EndScreen.scss';
import lottie from 'lottie-web';

import premium from 'assets/img/icons/premium_white.svg';

// components
import { Button } from 'components/basic';
import { NarrativeRecap, Chrono, StatsRecap } from 'components/complexe';
import animVictory from 'assets/animation/end/end_loose.json';
import animLoose from 'assets/animation/end/end_loose.json';
import { SocrateService } from '../../services/SocrateService';
import { NounouService } from '../../services/NounouService';
// import Header from 'components/logic/Header/Header';

/* LOTTIES */

class App extends Component {
  static propTypes = {
    step: PropTypes.object,
    profil: PropTypes.object,
  };

  static defaultProps = {
    step: false,
    profil: {},
  };

  constructor(props) {
    super(props);
    const recap = NounouService.getRecap();
    this.animationContainer = React.createRef();
    this.state = {
      narrativeRecap: {},
      flat: recap.actualFlat,
      totalVisits: recap.totalSeenAds,
      generalRecap: false,
      choiceRecap: false,
      visitChoiceStats: {},
      adventureChoiceStats: {},
      showStats: false,
    };
  }

  componentWillMount() {
    const recap = NounouService.getRecap();
    this.setState({ narrativeRecap: recap });
    this.generateData = false;
  }

  componentDidMount() {
    setTimeout(() => this.handleDataOnMount(this.props), 1000);


    const { step } = this.props;
    let anim = '';
    if (step.end === 'win') {
      anim = animVictory;
    } else {
      anim = animLoose;
    }

    lottie.loadAnimation({
      container: this.animationContainer.current, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: anim, // the path to the animation json
    });
  }

  componentWillReceiveProps(nextProps) {
    this.handleDataOnMount(nextProps);
  }

  handleDataOnMount = (props) => {
    console.log('handleDataOnMount');

    const { step, profil } = props;
    // if (step.victory !== undefined && step.finalTime && !this.generateData) {
    this.generateData = true;
    const recap = NounouService.getRecap();
    console.log('TCL: App -> handleDataOnMount -> recap', recap);
    this.setState({ narrativeRecap: recap });
    const formatedSkills = profil.skills.map(element => element.id);
    this.generalRecap(step.finalTime, step.victory, recap.totalSeenAds, formatedSkills, profil);
    this.choiceRecap(recap);
    // }
  }

  async generalRecap(time, win, ads, skills, profil) {
    // await SocrateService.sendRecap({
    //   time,
    //   isVictory: win,
    //   totalFlat: ads,
    //   skills,
    //   origin: profil.origin.id,
    //   budget: profil.budget.id,
    //   status: profil.status.id,
    //   score: profil.score,
    // });
    const recaps = await SocrateService.getGeneralRecap();
    this.setState({ generalRecap: recaps.data.data });
  }

  async choiceRecap(recap) {
    const { data: visitResponse } = await SocrateService.getCardStat(recap.actualFlat.visit.visit.id);
    const visit = { ...visitResponse.data, ...recap.actualFlat.visit.visit };
    const { data: questionResponse } = await SocrateService.getCardStat(recap.questionsAccepted[0].id);
    const question = { ...questionResponse.data, ...recap.questionsAccepted[0] };
    const { data: adventureResponse } = await SocrateService.getCardStat(recap.adventuresAccepted[0].id);
    const adventure = { ...adventureResponse.data, ...recap.adventuresAccepted[0] };
    this.setState({ choiceRecap: { visit, adventure, question } });
  }

  render() {
    const {
      step, profil,
    } = this.props;
    const {
      generalRecap, choiceRecap,
      narrativeRecap, showStats,
    } = this.state;

    return (
      <div className={`App main-layout end fade ${step.end === 'win' ? 'victory' : 'loose'}`}>
        <div id="header" className="layout--header">
          <Chrono />
        </div>
        <div className="container">
          <h1>
            {step.end === 'win' ? 'Victoire !' : 'Défaite' }
          </h1>
          <h2>
            {step.end === 'win' ? 'Vous avez trouvé un appartement !' : 'Vous n\'avez pas trouvé d\'appartement à temps...' }
          </h2>
          <div className="animation" ref={this.animationContainer} />
          {/* <img className="main-illu" src={premium} alt="" /> */}

          <NarrativeRecap profil={profil} recap={narrativeRecap} />
          { showStats && <StatsRecap recapData={{ generalRecap, choiceRecap, time: step.finalTime }} /> }


          {/* <div className="end-recap">
            Pour vivre dans un appartement
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
          </div> */}
        </div>

        <div id="footer" className="layout--footer">
          <Button text="Rejouer" />
          <Button text="Statistiques" onClick={() => { this.setState({ showStats: true }); }} />
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

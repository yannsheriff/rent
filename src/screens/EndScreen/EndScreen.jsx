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
    this.state = {
      flat: {},
      totalVisits: {},
      generalTime: 
    };
  }

  componentWillMount() {
    const { step, profil } = this.props;
    const recap = NounouService.getRecap();
    console.log('TCL: App -> componentWillMount -> recap', recap);
    this.setState({ flat: recap.actualFlat, totalVisits: recap.totalSeenAds });
  }

  componentWillReceiveProps(nextProps) {
    const { step, profil } = nextProps;
    if (step.victory !== undefined && step.finalTime) {
      const recap = NounouService.getRecap();
      const formatedSkills = profil.skills.map(element => element.id);
      SocrateService.sendRecap(step.finalTime, step.victory, recap.totalSeenAds, formatedSkills);
      const recaps = SocrateService.getGeneralRecap();
      this.setState({generalTime: })
      console.log('TCL: App -> componentWillReceiveProps -> recap', recaps);
    }
  }

  render() {
    const { step } = this.props;
    const { flat, totalVisits } = this.state;
    return (
      <div id="end">
        <h1>
          {step.end === 'win' ? 'Victoire !' : 'Défaite :(' }
        </h1>
        <div>
          <p>Recap :</p>
          Pour vivre dans un appartement
          {` ${flat.visit.visit_recap} `}
          vous avez visité
          {` ${totalVisits} `}
          apparts en
          {' '}
          {step.finalTime} 
          <ul>
            <li />
          </ul>
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

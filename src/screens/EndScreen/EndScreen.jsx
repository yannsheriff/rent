import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NounouService } from '../../services/NounouService';
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
    };
  }

  componentWillMount() {
    const recap = NounouService.getRecap();
    console.log('TCL: App -> componentDidMount -> recap', recap);
    this.setState({ flat: recap.actualFlat, totalVisits: recap.totalSeenAds });
  }

  render() {
    const { step } = this.props;
    const { flat, totalVisits } = this.state;
    return (
      <div className="App">
        <h1>
          {step.end === 'win' ? 'Victoire !' : 'Défaite :(' }
        </h1>
        <div>
          <p>Recap :</p>
          Pour vivre dans un appartement
          {` ${flat.visit.visit_recap} `}
          vous avez visité
          {` ${totalVisits} `}
          apparts
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
});

const componentContainer = connect(mapStateToProps)(App);

export default componentContainer;

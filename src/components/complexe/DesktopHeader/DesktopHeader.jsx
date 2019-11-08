/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './DesktopHeader.scss';
import lmstpLogo from 'assets/img/logo_louemoisitupeux.svg';

class DesktopHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { step } = this.props;
    return (
      <header className="desktop-header">
        <div className="desktop-header--container">
          <div id="lmstp">
            <div className={`${step.isSetUp || step.gameIsOver ? step.step : 'ads'} fade`}>
              <img src={lmstpLogo} alt="Logo Loue moi si tu peux !" />
            </div>
            <h1>Loue-moi si tu peux !</h1>
          </div>
          <img className="gobelins-logo" target="_blank" src="https://www.gobelins.fr/sites/all/themes/custom/gobelins_theme/build/images/logo-gobelins.png" alt="Gobelins logo" />
        </div>
      </header>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  step: state.stepReducer,
});

const componentContainer = connect(mapStateToProps)(DesktopHeader);

export default componentContainer;

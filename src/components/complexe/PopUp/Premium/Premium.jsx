import React, { Component } from 'react';
import { getPremium, updateTimer } from 'redux/actions/profil';
import { connect } from 'react-redux';
import './Premium.scss';


// eslint-disable-next-line react/prefer-stateless-function
class Premium extends Component {
  cancel = () => {
    this.props.hide();
  }

  purchasePremium = () => {
    const { premium, updateTime, hide } = this.props;
    premium();
    updateTime(-220);
    hide();
  }


  render() {
    return (
      <div className="premium--content">
        <img src="" alt="" />
        <h1>Bien réservé aux clients Premium</h1>
        <p>Souscrivez* dès à présent** à l'abonnement Premium pour accéder aux annonces de qualité supérieure.</p>
        <p className="premium--condition">
        * La création du statut prend du temps
          {' '}
          <br />
        ** Vraiment beaucoup de temps
        </p>
        <button className="btn" onClick={this.purchasePremium}>Souscrire</button>
        <button className="arrow" onClick={this.cancel}>X</button>
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  profil: state.profil,
});

const mapDispatchToProps = dispatch => ({
  premium: () => {
    dispatch(getPremium());
  },
  updateTime: (length) => {
    dispatch(updateTimer(length));
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Premium);

export default componentContainer;

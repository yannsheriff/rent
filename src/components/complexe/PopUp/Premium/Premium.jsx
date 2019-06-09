import React, { Component } from 'react';
import { getPremium, updateTimer } from 'redux/actions/profil';
import { connect } from 'react-redux';
import lottie from 'lottie-web';
import { Button } from 'components/basic';
import './Premium.scss';

import close from 'assets/img/icons/icon_close.svg';
import animations from 'assets/animation';

// eslint-disable-next-line react/prefer-stateless-function
class Premium extends Component {
  constructor(props) {
    super(props);
    this.animationContainer = React.createRef();
  }

  cancel = () => {
    this.props.hide();
  }

purchasePremium = () => {
  const {
    premium, updateTime, hide, playAnimation,
  } = this.props;
  premium();
  updateTime(-60);
  playAnimation();
}

componentDidMount() {
  this.anim = lottie.loadAnimation({
    container: this.animationContainer.current, // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: animations.premiumMedal, // the path to the animation json
  });
}


render() {
  return (
    <>
      <div className="premium--content">
        <div className="animation" ref={this.animationContainer} />
        <h1>Bien réservé aux clients Premium</h1>
        <p>Souscrivez* dès à présent** à l'abonnement Premium pour accéder aux annonces de qualité supérieure.</p>
        <p className="premium--condition">
        * La création du statut prend du temps
          {' '}
          <br />
        ** Vraiment beaucoup de temps
        </p>
        <Button onClick={this.purchasePremium} text="Souscrire" />
        <button className="arrow" onClick={this.cancel} type="button">
          <img src={close} alt="close popup" />
        </button>
      </div>
    </>
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

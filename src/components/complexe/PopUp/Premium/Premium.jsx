import React, { Component } from 'react';
import { getPremium } from 'redux/actions/profil';
import { connect } from 'react-redux';
import './Premium.scss';


// eslint-disable-next-line react/prefer-stateless-function
class Premium extends Component {
  cancel = () => {
    this.props.hide();
  }

  purchasePremium = () => {
    const { premium } = this.props;
    premium();
    this.props.hide();
  }


  render() {
    return (
      <div>
        <p> Do you want premium ? </p>
        <button onClick={this.purchasePremium}>YES </button>
        <button onClick={this.cancel}>NO </button>
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
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Premium);

export default componentContainer;

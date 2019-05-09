/* eslint-disable no-unused-expressions */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hidePopUp } from 'redux/actions/steps';
import Premium from './Premium/Premium';
import './PopUp.scss';

class PopUp extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    step: PropTypes.object,
    hide: PropTypes.func,
  }

  static defaultProps = {
    step: {},
    hide: () => {},
  }

  hidePopUp = () => {
    const { hide } = this.props;
    hide();
  }

  returnPopUp() {
    const { step } = this.props;
    switch (step.popup) {
      case 'premium':
        return <Premium hide={this.hidePopUp} />;
      default:
        return <Premium />;
    }
  }

  render() {
    const component = this.returnPopUp();
    return (
      <div id="premium--pop-up" className="fade">
        <div className="premium--container">
          {component}
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

const mapDispatchToProps = dispatch => ({
  hide: () => {
    dispatch(hidePopUp());
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopUp);

export default componentContainer;

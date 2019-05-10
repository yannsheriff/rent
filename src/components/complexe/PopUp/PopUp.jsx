/* eslint-disable no-unused-expressions */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hidePopUp } from 'redux/actions/steps';
import { CSSTransition } from 'react-transition-group';
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

  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ show: true }); }, 500);
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
    const { show } = this.state;
    const component = this.returnPopUp();
    return (
      <div id="premium--pop-up" className="fade">
        <CSSTransition in={show} timeout={500} classNames="trans-popup">
          <div className="premium--container">
            {component}
          </div>
        </CSSTransition>
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

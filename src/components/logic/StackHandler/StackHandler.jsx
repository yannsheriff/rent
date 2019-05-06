import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './StackHandler.scss';
import { CSSTransition } from 'react-transition-group';

// components
import Card from '../../basic/Card/Card';

class StackHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {

      bgColor: '#90d5d0',
      transition: false,
      show: true,
      cardIsRotate: false,
    };
  }

  //  ---- STEPS ----
  // - ads
  // - visit
  // - adventure
  // - skill
  // - question
  // - event

  componentDidMount() {
    setTimeout(() => { this.setState({ transition: true }); }, 300);
  }

  componentWillReceiveProps() {
    this.ref.resetPosition();
  }


  render() {
    // const {
    //   bgColor, show, transition, cardIsRotate,
    // } = this.state;
    const {
      content, reject, accept, leftChoice, rightChoice, isNarration,
    } = this.props;
    // const style = cardIsRotate ? { transform: 'rotate(2deg)' } : { transform: 'rotate(0deg)' };

    return (

    // <div id="stackHandler" style={{ backgroundColor: bgColor }}>
    //   <div className="card-placeholder-container">
    //     <div className="card-placeholder" style={style} />
    //   </div>
    //   { show
    //   && (
    //   <CSSTransition in={transition} timeout={1000} classNames="trans-card" onEntered={() => this.setState({ cardIsRotate: true })}>
    //     <div className="card-container">
      <Card
        swipLeft={reject}
        swipRight={accept}
        leftChoice={isNarration ? '' : leftChoice}
        rightChoice={isNarration ? '' : rightChoice}
        onRef={(ref) => { this.ref = ref; }}
      >
        {content}
      </Card>
    //     </div>
    //   </CSSTransition>
    //   )

    // </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  mainState: state.mainReducer,
  profil: state.profilReducer,
});

const componentContainer = connect(
  mapStateToProps,
)(StackHandler);

export default componentContainer;

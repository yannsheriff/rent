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
      cards: props.content,
      actualCard: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ transition: true }); }, 100);
  }

  componentWillReceiveProps() {
    this.setState({ actualCard: 0 }, () => this.ref.resetPosition());
  }

  nextCard() {
    this.setState(state => ({ actualCard: state.actualCard + 1 }), () => this.ref.resetPosition());
  }


  render() {
    const {
      bgColor, show, transition, cardIsRotate, actualCard,
    } = this.state;
    const {
      content, reject, accept, leftChoice, rightChoice, isNarration,
    } = this.props;
    // const style = cardIsRotate ? { transform: 'rotate(2deg)' } : { transform: 'rotate(0deg)' };
    const isLastCard = content.length === actualCard + 1;
    const displayChoice = !isNarration && isLastCard;

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
        swipLeft={() => (isLastCard ? reject() : this.nextCard())}
        swipRight={() => (isLastCard ? accept() : this.nextCard())}
        leftChoice={displayChoice ? leftChoice : ''}
        rightChoice={displayChoice ? rightChoice : ''}
        onRef={(ref) => { this.ref = ref; }}
      >
        {content[actualCard]}
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

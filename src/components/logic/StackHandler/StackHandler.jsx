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
      bgColor: '#5f7bfc',
      transition: false,
      show: true,
      cardIsRotate: false,
      cards: props.content,
      actualCard: 0,
    };
  }

  componentDidMount() {
    this.setState({ actualCard: 0 }, () => this.playEnterTransition());
  }

  componentWillReceiveProps() {
    this.setState({ actualCard: 0 }, () => this.playEnterTransition());
  }

  componentDidUpdate() {
    const {
      show, transition, cardIsRotate, actualCard,
    } = this.state;
    if (!show && !transition && !cardIsRotate && actualCard > 0) {
      this.playEnterTransition();
    }
  }


  playEnterTransition() {
    this.setState({ show: true }, () => {
      setTimeout(() => { this.setState({ transition: true }); }, 200);
    });
  }

  nextCard(choice) {
    const { content, reject, accept } = this.props;
    const { actualCard } = this.state;
    const isLastCard = content.length === actualCard + 1;

    this.setState({ show: false, transition: false, cardIsRotate: false }, () => {
      this.ref.resetPosition();
      if (isLastCard) {
        choice ? accept() : reject();
      } else {
        this.setState(state => ({ actualCard: state.actualCard + 1 }));
      }
    });
  }


  render() {
    const {
      show,
      transition,
      cardIsRotate,
      actualCard,
    } = this.state;

    const {
      content,
      leftChoice,
      rightChoice,
      isNarration,
      step,
    } = this.props;

    const style = cardIsRotate ? { transform: 'rotate(4deg)' } : { transform: 'rotate(0deg)' };
    const isLastCard = content.length === actualCard + 1;
    const displayChoice = !isNarration && isLastCard;
    const isCardLocked = step === 'skill';
    console.log('TCL: render -> isCardLocked', isCardLocked);

    return (
      <div id="stackHandler">
        <div className="background-card--placeholder">
          <div className="card background-card" style={style} />
        </div>
        { show
      && (
      <CSSTransition in={transition} timeout={500} classNames="trans-card" onEntered={() => this.setState({ cardIsRotate: true })}>
        <div className="card--placeholder">
          <Card
            swipLeft={() => (this.nextCard(false))}
            swipRight={() => (this.nextCard(true))}
            leftChoice={displayChoice ? leftChoice : ''}
            rightChoice={displayChoice ? rightChoice : ''}
            isLocked={isCardLocked}
            onRef={(ref) => { this.ref = ref; }}
          >
            {content[actualCard]}
          </Card>
        </div>
      </CSSTransition>
      )}
      </div>
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

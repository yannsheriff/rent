import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StackHandler.scss';
import { CSSTransition } from 'react-transition-group';

// components
import Card from '../../complexe/Card/Card';

class StackHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: false,
      show: true,
      cardIsRotate: false,
      cards: props.content,
      actualCard: 0,
    };
  }

  componentDidMount() {
    const { onRef } = this.props;
    this.setState({ actualCard: 0 }, () => this.playEnterTransition());
    if (onRef) {
      onRef(this);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isNarration: oldIsNarration, content: oldContent } = this.props;
    const { isNarration, content } = nextProps;

    if (JSON.stringify(oldContent) !== JSON.stringify(content) || oldIsNarration !== isNarration) {
      this.resetCardStack().then(() => {
        this.setState({ actualCard: 0 }, () => this.playEnterTransition());
      });
    }
  }

  componentDidUpdate() {
    const {
      show, transition, cardIsRotate, actualCard,
    } = this.state;
    if (!show && !transition && !cardIsRotate && actualCard > 0) {
      this.playEnterTransition();
    }
  }

  rerollCard = () => {
    this.ref.animatedResetPosition();
  }

  resetCardStack = async () => new Promise((resolve) => {
    this.setState({ show: false, transition: false, cardIsRotate: false }, () => {
      if (this.ref) {
        this.ref.resetPosition();
      }
      resolve();
    });
  })

  playEnterTransition = () => {
    this.setState({ show: true }, () => {
      setTimeout(() => { this.setState({ transition: true }); }, 200);
    });
  }

  nextCard = (choice) => {
    const { content, reject, accept } = this.props;
    const { actualCard } = this.state;
    const isLastCard = content.length === actualCard + 1;

    if (isLastCard) {
      choice ? accept() : reject();
    } else {
      this.resetCardStack().then(() => {
        this.setState(state => ({ actualCard: state.actualCard + 1 }));
      });
    }
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
    const isCardLocked = step === 'skill' && !isNarration;

    let cardTemplate = (
      <div className="loading">
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>

      </div>
    );

    if (content[actualCard]) {
      cardTemplate = React.cloneElement(content[actualCard],
        { forceCardSwipe: this.ref ? this.ref.forceCardSwipe : () => {} });
    }

    return (
      <div id="stackHandler">
        <div className="background-card--placeholder">
          <div className="card background-card smooth" style={style} />
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
            {cardTemplate}
          </Card>
        </div>
      </CSSTransition>
      )}
      </div>
    );
  }
}

export default StackHandler;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './DataHandler.scss';
import { CSSTransition } from 'react-transition-group';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { EthanService } from '../../../services/EthanServices';
import { NounouService } from '../../../services/NounouService';
import StackHandler from '../StackHandler/StackHandler';
import {
  updateStatus, updateBudget, updateOrigin, updateScore,
} from '../../../redux/actions/profil';


// components

import Ads from '../../complexe/Ads/Ads';
import Adventure from '../../complexe/Adventure/Adventure';
import Event from '../../complexe/Event/Event';
import Question from '../../complexe/Question/Question';
import Skill from '../../complexe/Skill/Skill';
import Visit from '../../complexe/Visit/Visit';

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * ((max - 1) - min) + min);
}

class DataHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ads: this.getCardData('ads'),
      actualAd: 0,
      round: 0,
      data: this.getCardData('ads')[0],
      card: this.returnActualComponent(this.getCardData('ads')[0]),
      isNarration: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { step } = nextProps;
    if (step !== 'ads') {
      const data = this.getCardData(step);
      const card = this.returnActualComponent(data, step);
      this.setState({ data, card });
    } else {
      this.setState(state => ({
        card: this.returnActualComponent(state.ads[state.actualAd], 'ads'),
      }));
    }
  }


  getCardData = (step) => {
    const { profil } = this.props;
    const data = EthanService.get(step, profil);
    return data || this.state.data;
  }


  returnActualComponent = (data, step) => {
    const childProps = {
      data,
    };

    switch (step) {
      case 'ads':
        return <Ads {...childProps} />;

      case 'visit':
        return <Visit {...childProps} />;

      case 'adventure':
        return <Adventure {...childProps} />;

      case 'skill':
        return <Skill {...childProps} />;

      case 'question':
        return <Question {...childProps} />;

      case 'event':
        return <Event {...childProps} />;

      default:
        return <Ads {...childProps} />;
    }
  }

  nextCard = (choice) => {
    const { step } = this.props;

    switch (step) {
      case 'ads':
        this.handleAd(choice);
        break;

      case 'visit':
        this.handleVisit(choice);
        break;

      case 'adventure':
        this.handleAdventure(choice);
        break;

      case 'skill':
        this.handleSkill(choice);
        break;

      case 'question':
        this.handleQuestion(choice);
        break;

      case 'event':
        this.handleEvent(choice);
        break;

      default:
        return 'ads';
    }
  }

  updateProfile = () => {
    const {
      updateScore, updateStatus, updateBudget, updateOrigin,
    } = this.props;
    const { data } = this.state;

    if (data.question_new_points) {
      updateScore(data.question_new_points);
    }
    if (data.question_new_status) {
      updateStatus(data.question_new_status);
    }
    if (data.question_new_budget) {
      updateBudget(data.question_new_budget);
    }
    if (data.question_new_origin) {
      updateOrigin(data.question_new_origin);
    }
  }

  handleAd(choice) {
    const { next } = this.props;
    const { data, actualAd, ads } = this.state;

    if (choice) {
      this.setState(state => ({ actualAd: state.actualAd + 1, data: state.ads[actualAd + 1] }));
      NounouService.saveAd(data);
      next();
    } else if (ads.length <= actualAd) {
      this.setState({
        actualAd: 0,
        card: this.returnActualComponent(ads[0], 'ads'),
      });
    } else {
      this.setState(state => ({
        actualAd: state.actualAd + 1,
        card: this.returnActualComponent(ads[state.actualAd + 1], 'ads'),
      }));
    }
  }


  handleVisit(choice) {
    const { next, fail, round } = this.props;
    const { data, isNarration } = this.state;
    const rand = getRandomArbitrary(0, 10);

    if (choice) {
      if (isNarration) {
        this.setState({ isNarration: false });
        fail();
      } else if (round === 0 || rand === 0) {
        const card = (
          <div dangerouslySetInnerHTML={
              { __html: documentToHtmlString(data.reject.reject_narration) }
              }
          />
        );
        this.setState({ card, isNarration: true });
      } else {
        next();
      }
    } else {
      fail();
    }
  }

  handleAdventure(choice) {
    const { next, fail } = this.props;
    const { data, isNarration } = this.state;
    if (choice) {
      next();
    } else if (isNarration) {
      this.setState({ isNarration: false });
      fail();
    } else {
      const card = (
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.adventure_back) }} />
      );
      this.setState({ card, isNarration: true });
    }
  }

  handleQuestion(choice) {
    const { next } = this.props;
    const { data, isNarration } = this.state;
    if (isNarration) {
      this.setState({ isNarration: false });
      next();
    } else {
      const content = choice ? data.question_accept_narration : data.question_refuse_narration;
      if (choice) { this.updateProfile(); }
      const card = (
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(content) }} />
      );
      this.setState({ card, isNarration: true });
    }
  }


  render() {
    const { card } = this.state;
    return <StackHandler accept={() => this.nextCard(true)} reject={() => this.nextCard(false)} content={card} />;
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  mainState: state.mainReducer,
  profil: state.profilReducer,
});

const mapDispatchToProps = dispatch => ({
  updateStatus: (e) => {
    dispatch(updateStatus(e));
  },
  updateBudget: (e) => {
    dispatch(updateBudget(e));
  },
  updateOrigin: (e) => {
    dispatch(updateOrigin(e));
  },
  updateScore: (e) => {
    dispatch(updateScore(e));
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataHandler);

export default componentContainer;

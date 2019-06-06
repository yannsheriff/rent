/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NarrativeRecap.scss';

import scroll from 'assets/img/icons/icon_scroll.svg';
import premium from 'assets/img/icons/premium_white.svg';
import visit from 'assets/img/icons/icon_visites_white.svg';
import question from 'assets/img/icons/icon_question_white.svg';
import adventureac from 'assets/img/icons/icon_question_white.svg';
import adventureref from 'assets/img/icons/icon_adventure_white.svg';
import test from 'assets/img/icons/icon_question_white.svg';

class NarrativeRecap extends Component {
  static propTypes = {
    recap: PropTypes.object,
    profil: PropTypes.object,
  };

  static defaultProps = {
    recap: PropTypes.object,
    profil: PropTypes.object,
  };

  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      flat: props.recap.actualFlat,
      visitsAccepted: props.recap.visitsAccepted,
      questionsAccepted: props.recap.questionsAccepted,
      adventuresAccepted: props.recap.adventuresAccepted,
      adventuresRejected: props.recap.adventuresRejected,
    };
  }

  render() {
    const { profil } = this.props;
    const {
      flat, visitsAccepted, questionsAccepted, adventuresAccepted, adventuresRejected,
    } = this.state;

    console.log(adventuresAccepted);
    const visitList = visitsAccepted.map(visit => <li>{visit.visit_recap}</li>);
    const questionList = questionsAccepted.map(question => <li>{question.question_recap}</li>);
    const adventureAcceptedList = adventuresAccepted.map(adventure => <li>{adventure.adventure_second_choice_recap}</li>);
    const adventureRejectedList = adventuresRejected.map(adventure => <li>{adventure.adventure_first_choice_recap}</li>);

    return (
      <div className="recap--narrative">
        <header>
          Pour vivre
          <span className="lowercase strong">{` ${profil.status.title} `}</span>
          dans un(e)
          <span className="lowercase strong">{` ${flat.flat.ad_title} `}</span>
          de
          <span className="lowercase strong">
            {` ${flat.flat.ad_size} `}
            m²
          </span>

          <span className="lowercase strong">{` ${flat.visit.visit_recap}`}</span>
          , vous avez :
        </header>

        <img className="scroll" src={scroll} alt="" />

        <div id="content">

          {profil.premium && (
            <section>
              <div className="hr premium">
                <img src={premium} alt="" />
              </div>
              <ul>
                <li>
                  Souscrit à l’option premium
                </li>
              </ul>
            </section>
          )}

          {visitsAccepted.length > 0 && (
            <section>
              <div className="hr">
                <img src={visit} alt="" />
              </div>
              <ul>
                Déposé un dossier pour un loyer
                {' '}
                { visitList }
              </ul>
            </section>
          )}

          {questionsAccepted.length > 0 && (
            <section>
              <div className="hr">
                <img src={question} alt="" />
              </div>
              <ul>{ questionList }</ul>
            </section>
          )}

          {adventuresAccepted.length > 0 && (
            <section>
              <div className="hr rotate">
                <img src={adventureac} alt="" />
              </div>
              <ul>
                Refusé
                {' '}
                { adventureAcceptedList }
              </ul>
            </section>
          )}

          {adventuresRejected.length > 0 && (
            <section>
              <div className="hr">
                <img src={adventureref} alt="" />
              </div>
              <ul>
                Mais êtes allé jusqu'à
                {' '}
                { adventureRejectedList }
              </ul>
            </section>
          )}
        </div>
      </div>
    );
  }
}

export default NarrativeRecap;

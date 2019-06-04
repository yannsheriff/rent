/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NarrativeRecap.scss';

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

    console.log(visitsAccepted);
    console.log(questionsAccepted);
    console.log(adventuresAccepted);
    console.log(adventuresRejected);

    const visitList = visitsAccepted.map(visit => <li>{visit.visit_recap}</li>);
    const questionList = questionsAccepted.map(question => <li>{question.question_recap}</li>);
    const adventureAcceptedList = adventuresAccepted.map(adventure => <li>{adventure.adventure_first_choice_recap}</li>);
    const adventureRejectedList = adventuresRejected.map(adventure => <li>{adventure.adventure_second_choice_recap}</li>);

    return (
      <div className="recap--narrative">
        <p>
          Pour vivre
          <span className="lowercase">{` ${profil.status.title} `}</span>
          dans un(e)
          <span className="lowercase">{` ${flat.flat.ad_title} `}</span>
          de
          <span className="lowercase">{` ${flat.flat.ad_size} `}</span>
          m²
          {` ${flat.visit.visit_recap} `}
          , vous avez :
        </p>

        <ul>
          {profil.premium && (
            <li>
              Souscrit à l’option premium
            </li>
          )}
          {visitsAccepted.length > 0 && (
            <li>
              Déposé un dossier pour un loyer
              {' '}
              <ul>{ visitList }</ul>
            </li>
          )}
          {questionsAccepted.length > 0 && (
            <li>
              Déposé un dossier pour un loyer
              {' '}
              <ul>{ questionList }</ul>
            </li>
          )}
          {adventuresAccepted.length > 0 && (
            <li>
              Refusé
              {' '}
              <ul>{ adventureAcceptedList }</ul>
            </li>
          )}
          {adventuresRejected.length > 0 && (
            <li>
              mais êtes allé jusqu'à
              {' '}
              <ul>{ adventureRejectedList }</ul>
            </li>
          )}
        </ul>

      </div>
    );
  }
}

export default NarrativeRecap;

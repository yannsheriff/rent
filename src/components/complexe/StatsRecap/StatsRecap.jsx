/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-nested-ternary */
import React from 'react';
import './StatsRecap.scss';
import { secondsToMonth } from 'vendors/humanize';
import { StatBar } from 'components/simple';
import { Button } from 'components/basic';
import skillsData from 'assets/content/skills';
import { scroll, closeWhite } from 'assets/img/icons';


function StatsRecap(props) {
  const { onClose, onReplay } = props;
  const {
    generalRecap, choiceRecap, time, win,
  } = props.recapData;
  // console.log(generalRecap);
  // console.log(choiceRecap);
  // console.log(time);
  // console.log(win);

  const winPercent = Math.floor(generalRecap.totalWins / generalRecap.totalGames * 100);
  const loosePercent = 100 - winPercent;
  console.log(loosePercent);
  // const visitChoice = Math.floor(visitChoiceStats.accept / visitChoiceStats.total * 100);
  // const adventureChoice = Math.floor(adventureChoiceStats.accept / adventureChoiceStats.total * 100);

  const formatedSkills = () => {
    const keys = Object.keys(generalRecap.skills);
    const array = keys.map(el => ({ value: el, count: generalRecap.skills[el], title: skillsData.find(e => el === e.id).title }));
    const sorted = array.sort((a, b) => (b.count - a.count));
    const skills = [];
    for (let index = 0; index < 3; index++) {
      skills.push(sorted[index]);
    }
    return skills;
  };

  const skill = formatedSkills().map(element => (
    <div className="skill-data">
      <h5>
        {Math.floor(element.count * 100 / generalRecap.totalGames)}
        %
      </h5>
      <p>
        des utilisateurs choisissent la capacité
        {' '}
        <strong>{element.title}</strong>
        .
      </p>
    </div>
  ));


  return (
    <div className="statsRecap">
      <img src={closeWhite} alt="close stats" onClick={() => onClose()} />
      <div className="scroll">
        <div className="wrapper">
          { win && (
            <>
              <h3>
                Félicitations, comme
                {' '}
                <strong>
                  {winPercent}
                  % des joueurs, vous avez trouvé un appartement à temps !
                </strong>
              </h3>
              <h3>
                Vous avez mis
                {' '}
                <strong>
                  {secondsToMonth(time)}
                  {' '}
                  mois
                  {' '}
                </strong>
                contre
                <strong>
                  {' '}
                  { secondsToMonth(generalRecap.avgTime)}
                  {' '}
                  mois
                  {' '}
                </strong>
                en moyenne.
              </h3>
            </>
          )}

          { !win && (
            <h3>
                Vous avez échoué à trouver un appartement en moins de 6 mois. Mais rassurez-vous, comme vous
                {' '}
              <strong>
                {loosePercent}
                %
              </strong>
              {' '}
                des joueurs n’ont pas réussi non plus !
            </h3>
          )}


          <h4>Les joueurs ont : </h4>

          { choiceRecap.adventure
          && <StatBar legend={`Accepté de ${choiceRecap.adventure.adventure_second_choice_recap}`} percent={choiceRecap.adventure.reject * 100 / choiceRecap.adventure.total} />}
          { choiceRecap.question
          && <StatBar legend={choiceRecap.question.question_recap} percent={choiceRecap.question.reject * 100 / choiceRecap.question.total} />}
          { choiceRecap.visit
          && <StatBar legend={`Déposé un dossier pour un logement ${choiceRecap.visit.visit_recap}`} percent={choiceRecap.visit.reject * 100 / choiceRecap.visit.total} />}
          {skill}
        </div>
      </div>
      <div id="footer" className="layout--footer">
        <img src={scroll} />
        <Button text="Rejouer" onClick={() => { onReplay(); }} />
      </div>
    </div>

  );
}

export default StatsRecap;

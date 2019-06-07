/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import lmstpBanner from 'assets/img/intro.gif';
import { Button } from 'components/basic';
import './Launch.scss';

function Launch(props) {
  const { next } = props;
  return (
    <div id="launch">
      <div className="header">
        <div className="menu" />
      </div>
      <div className="content">
        <div>
          <img className="intro--banner" src={lmstpBanner} alt="rent-banner" />
          <h1>Dernier check up.</h1>
          <p>
           Une fois la partie lancée, vous n'aurez que 5 minutes pour dégoter un appartement !
           Serez-vous à la hauteur ?
          </p>
        </div>

        <Button onClick={() => next()} text="C'est parti !" />
      </div>
    </div>
  );
}

export default Launch;

/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import lmstpBanner from 'assets/img/intro.gif';
import './Launch.scss';

function Launch(props) {
  const { next } = props;
  return (
    <div id="launch" className="launch">
      <div className="header">
        <div className="menu" />
      </div>
      <div className="content">
        <div>
          <img className="intro--banner" src={lmstpBanner} alt="rent-banner" />
          <h1>Dernier check up.</h1>
          <p>
           Une fois la partie lancé, vous n'aurez que 5 minutes pour dégoter un appartement ! Autant dire que vous avez peu de chance de reussir..
           Vous etes prets ?
          </p>
        </div>
        <button className="btn" onClick={() => next()}> C'est moi le plus fort. </button>
      </div>
    </div>
  );
}

export default Launch;

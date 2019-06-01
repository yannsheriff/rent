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
          <h1>Retro occupy organic, stumptow.</h1>
          <p>
            Retro occupy organic, stumptown shabby chic pour-over roof party DIY normcore. Actually artisan organic occupy, Wes Anderson ugh whatever pou.
          </p>
        </div>
        <button className="btn" onClick={() => next()}> Je vais y arriver </button>
      </div>
    </div>
  );
}

export default Launch;

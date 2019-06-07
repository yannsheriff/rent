
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import './StatBar.scss';
import { Loader } from 'components/basic';

function StatBar(props) {
  const { legend, percent } = props;


  return (
    <div id="stat-bar">
      <div>
        <p className="legend">{legend}</p>
      </div>
      <Loader percent={100 - percent} />
      <div className="choice-container">
        <div>
          <h2>OUI</h2>
          <p>
            {Math.floor(100 - percent)}
%
          </p>
        </div>
        <div>
          <h2>Non</h2>
          <p>
            {Math.floor(percent)}
%
          </p>
        </div>
      </div>
    </div>
  );
}


export default StatBar;

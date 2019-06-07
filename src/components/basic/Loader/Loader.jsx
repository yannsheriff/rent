/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import './Loader.scss';

function Loader(props) {
  const { percent } = props;


  return (
    <div id="loader">
      <div className="loader--fill" style={{ width: `${percent}%` }} />
      <div className="loader--empty" />
    </div>
  );
}


export default Loader;

/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { MozartService } from 'services/MozartService';
import './Button.scss';

function Button(props) {
  const { text, onClick } = props;

  function click() {
    MozartService.interaction('click');
    onClick();
  }

  return (
    <button className="btn" onClick={click} type="button">{text}</button>
  );
}


export default Button;

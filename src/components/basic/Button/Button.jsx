/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { MozartService } from 'services/MozartService';
import './Button.scss';

function Button(props) {
  const { text, onClick, disabled } = props;

  function click() {
    MozartService.interaction('click');
    onClick();
  }

  return (
    <button className={`btn ${disabled ? 'disabled' : ''}`} onClick={click} type="button" disabled={disabled}>{text}</button>
  );
}


export default Button;

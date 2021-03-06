export const DID_SET_UP = 'DID_SET_UP';
export const CHANGE_STEP = 'CHANGE_STEP';
export const END_GAME = 'END_GAME';
export const REPLAY = 'REPLAY';
export const DISPLAY_POP_UP = 'DISPLAY_POP_UP';
export const HIDE_POP_UP = 'HIDE_POP_UP';
export const SET_FINAL_TIME = 'SET_FINAL_TIME';

export function gameIsSetUp() {
  return {
    type: DID_SET_UP,
  };
}

export function changeStep(payload) {
  return {
    type: CHANGE_STEP,
    payload,
  };
}

export function endGame(payload) {
  return {
    type: END_GAME,
    payload,
  };
}
export function displayPopUp(payload) {
  return {
    type: DISPLAY_POP_UP,
    payload,
  };
}
export function hidePopUp() {
  return {
    type: HIDE_POP_UP,
  };
}
export function setFinalTime(payload) {
  return {
    type: SET_FINAL_TIME,
    payload,
  };
}
export function replay() {
  return {
    type: REPLAY,
  };
}

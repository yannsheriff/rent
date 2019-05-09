export const DID_SET_UP = 'DID_SET_UP';
export const CHANGE_STEP = 'CHANGE_STEP';
export const END_GAME = 'END_GAME';
export const DISPLAY_POP_UP = 'DISPLAY_POP_UP';
export const HIDE_POP_UP = 'HIDE_POP_UP';

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

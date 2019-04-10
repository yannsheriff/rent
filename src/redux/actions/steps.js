export const DID_SET_UP = 'DID_SET_UP';
export const CHANGE_STEP = 'CHANGE_STEP';
export const END_GAME = 'END_GAME';

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

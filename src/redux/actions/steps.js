export const DID_SET_UP = 'DID_SET_UP';
export const CHANGE_STEP = 'CHANGE_STEP';


export function gameIsSetUp() {
  return {
    type: DID_SET_UP,
  };
}

export function changeStep(payload) {
  return {
    type: CHANGE_STEP,
    payload: payload
  };
}


/* eslint-disable import/prefer-default-export */
import { DID_SET_UP, CHANGE_STEP, END_GAME } from '../actions/steps';

const defaultState = {
  isSetUp: false,
  step: 'ads',
  gameIsOver: false,
  victory: false,
};

export function stepReducer(state = defaultState, action) {
  console.log('step reducer');
  switch (action.type) {
    case DID_SET_UP:
      return {
        ...state,
        isSetUp: true,
      };

    case CHANGE_STEP:
      console.log('change step');
      return {
        ...state,
        step: action.payload,
      };

    case END_GAME:
      return {
        ...state,
        gameIsOver: true,
        end: action.payload,
      };

      // case ACTION:
      //   return {
      //     ...state,
      //   };

    default:
      return state;
  }
}

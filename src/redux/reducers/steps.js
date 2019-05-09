/* eslint-disable import/prefer-default-export */
import {
  DID_SET_UP, CHANGE_STEP, END_GAME, DISPLAY_POP_UP, HIDE_POP_UP,
} from '../actions/steps';

const defaultState = {
  isSetUp: false,
  step: 'ads',
  gameIsOver: false,
  victory: false,
  popup: false,
};

export function stepReducer(state = defaultState, action) {
  switch (action.type) {
    case DID_SET_UP:
      return {
        ...state,
        isSetUp: true,
      };

    case CHANGE_STEP:
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

    case DISPLAY_POP_UP:
      return {
        ...state,
        popup: action.payload,
      };

    case HIDE_POP_UP:
      return {
        ...state,
        popup: false,
      };

      // case ACTION:
      //   return {
      //     ...state,
      //   };

    default:
      return state;
  }
}

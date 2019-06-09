/* eslint-disable import/prefer-default-export */
import {
  DID_SET_UP, CHANGE_STEP, END_GAME, DISPLAY_POP_UP, HIDE_POP_UP, SET_FINAL_TIME, REPLAY,
} from '../actions/steps';

const defaultState = {
  isSetUp: true,
  step: 'ads',
  gameIsOver: false,
  victory: undefined,
  finalTime: false,
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
        victory: action.payload === 'win',
      };

    case SET_FINAL_TIME:
      return {
        ...state,
        finalTime: action.payload,
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

    case REPLAY:
      return {
        ...state,
        gameIsOver: false,
        victory: undefined,
        isSetUp: false,
      };


      // case ACTION:
      //   return {
      //     ...state,
      //   };

    default:
      return state;
  }
}

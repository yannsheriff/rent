import { DID_SET_UP } from '../actions/steps';
import { CHANGE_STEP } from '../actions/steps';
// import { ACTION } from '../actions/';

const defaultState =  {
  isSetUp: false, 
  step: 'ads'
}

export function stepReducer(state = defaultState, action) {
  switch (action.type) {
    case DID_SET_UP:
      return {
        ...state,
        isSetUp: true
      };

      case CHANGE_STEP:
        return {
          ...state,
          step: action.payload
        };

    // case ACTION:

    //   return {
    //     ...state,
    //   };

    default:
      return state;
  }
}

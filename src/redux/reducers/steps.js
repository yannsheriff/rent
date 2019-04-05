import { DID_SET_UP } from '../actions/steps';
// import { ACTION } from '../actions/';

const defaultState =  {
  isSetUp: false
}

export function stepReducer(state = defaultState, action) {
  switch (action.type) {
    case DID_SET_UP:

      return {
        ...state,
        isSetUp: true
      };

    // case ACTION:

    //   return {
    //     ...state,
    //   };

    default:
      return state;
  }
}

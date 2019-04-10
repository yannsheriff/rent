// import { ACTION } from '../actions/action';

const defaultState = {
  test: 'ok',
  ntm: '?',
};

export function mainReducer(state = defaultState, action) {
  switch (action.type) {
    // case ACTION:

    //   return {
    //     ...state,
    //   };

    default:
      return state;
  }
}

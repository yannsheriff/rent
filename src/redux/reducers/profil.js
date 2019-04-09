/* eslint-disable import/prefer-default-export */
// import { ACTION } from '../actions/';

const defaultState = {
  status: { title: 'coloc', value: 1 },
  origin: { title: 'franco-français', value: 3 },
  budget: { title: '€€', value: 2 },
  skills: [{ title: 'chatch', id: 0 }, { title: 'psycho', id: 0 }],
  score: 0,
  premium: false,
};

export function profilReducer(state = defaultState, action) {
  switch (action.type) {
    // case ACTION:

    //   return {
    //     ...state,
    //   };

    default:
      return state;
  }
}

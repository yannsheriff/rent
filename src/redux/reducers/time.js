/* eslint-disable import/prefer-default-export */
import {
} from '../actions/steps';

const defaultState = {
  time: 300,
};

export function stepReducer(state = defaultState, action) {
  switch (action.type) {

    default:
      return state;
  }
}

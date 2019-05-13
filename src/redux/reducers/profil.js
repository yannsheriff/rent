/* eslint-disable import/prefer-default-export */
// import { ACTION } from '../actions/';

import skill from 'assets/content/skills';
import poor from 'assets/content/budget/img/icon_profile_budget_poor.svg';

import {
  UPDATE_STATUS, UPDATE_BUDGET, UPDATE_ORIGIN, UPDATE_BONUS, UPDATE_SKILLS, GET_PREMIUM, UPDATE_TIME,
} from '../actions/profil';

import statuss from '../../assets/content/status';
import originss from '../../assets/content/origins';
import budgetss from '../../assets/content/budget';

const defaultState = {
  // status: {},
  // origin: {},
  // budget: {},
  // skills: [],
  status: statuss[0],
  origin: originss[0],
  budget: budgetss[0],
  skills: [
    skill[0], skill[2],
  ],
  bonus: 0,
  score: 0,
  time: 300,
  premium: false,
};

export function profilReducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_STATUS: {
      const newStatus = action.payload;
      const newScore = ((((newStatus.value + state.origin.value + state.budget.value) * 2 + state.bonus) * 5) / 21).toFixed(1);
      return {
        ...state,
        status: newStatus,
        score: newScore,
      };
    }

    case UPDATE_BUDGET: {
      const newBudget = action.payload;
      const newScore = ((((state.status.value + state.origin.value + newBudget.value) * 2 + state.bonus) * 5) / 21).toFixed(1);
      return {
        ...state,
        budget: newBudget,
        score: newScore,
      };
    }

    case UPDATE_ORIGIN: {
      const newOrigin = action.payload;
      const newScore = ((((state.status.value + newOrigin.value + state.budget.value) * 2 + state.bonus) * 5) / 21).toFixed(1);
      return {
        ...state,
        origin: newOrigin,
        score: newScore,
      };
    }

    case UPDATE_BONUS: {
      const newBonus = state.bonus + action.payload;
      const newScore = ((((state.status.value + state.origin.value + state.budget.value) * 2 + newBonus) * 5) / 21).toFixed(1);
      return {
        ...state,
        bonus: newBonus,
        score: newScore,
      };
    }

    case UPDATE_SKILLS: {
      return {
        ...state,
        skills: action.payload,
      };
    }

    case UPDATE_TIME: {
      return {
        ...state,
        time: typeof (action.payload) === 'number' ? (state.time + action.payload) : state.time,
      };
    }

    case GET_PREMIUM: {
      return {
        ...state,
        premium: true,
      };
    }

    default:
      return state;
  }
}

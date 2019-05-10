/* eslint-disable import/prefer-default-export */
// import { ACTION } from '../actions/';

import poor from '../../assets/content/budget/img/icon_profile_budget_poor.svg';

import {
  UPDATE_STATUS, UPDATE_BUDGET, UPDATE_ORIGIN, UPDATE_BONUS, UPDATE_SKILLS, GET_PREMIUM, UPDATE_TIME,
} from '../actions/profil';

import origins from '../../assets/content/origins';
import coupleLight from '../../assets/content/status';

const defaultState = {
  status: {
    title: 'En couple',
    picto: coupleLight,
    pictoLight: coupleLight,
    value: 3,
    ref: 'couple',
  },
  origin: {
    name: 'Franco-Allemande',
    flag: '🇩🇪',
    value: 3,
    ref: 'frfr',
  },
  budget: {
    title: '€',
    picto: poor,
    pictoLight: poor,
    value: 1,
    ref: 'poor',
  },
  skills: [{ title: 'As de Photoshop', id: 'photoshop' },
    { title: 'Psychopathe en Herbe', id: 'psychopathe' }],
  bonus: 0,
  score: 0,
  time: 300,
  premium: false,
};

export function profilReducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_STATUS: {
      const newStatus = action.payload;
      const newScore = ((((newStatus.value + state.origin.value + state.budget.value) * 2 + state.bonus) * 5) / 21).toFixed(2);
      return {
        ...state,
        status: newStatus,
        score: newScore,
      };
    }

    case UPDATE_BUDGET: {
      const newBudget = action.payload;
      const newScore = ((((state.status.value + state.origin.value + newBudget.value) * 2 + state.bonus) * 5) / 21).toFixed(2);
      return {
        ...state,
        budget: newBudget,
        score: newScore,
      };
    }

    case UPDATE_ORIGIN: {
      const newOrigin = action.payload;
      const newScore = ((((state.status.value + newOrigin.value + state.budget.value) * 2 + state.bonus) * 5) / 21).toFixed(2);
      return {
        ...state,
        origin: newOrigin,
        score: newScore,
      };
    }

    case UPDATE_BONUS: {
      const newBonus = state.bonus + action.payload;
      const newScore = ((((state.status.value + state.origin.value + state.budget.value) * 2 + newBonus) * 5) / 21).toFixed(2);
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


    // case ACTION:

    //   return {
    //     ...state,
    //   };

    default:
      return state;
  }
}

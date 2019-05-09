/* eslint-disable import/prefer-default-export */
// import { ACTION } from '../actions/';

import {
  UPDATE_STATUS, UPDATE_BUDGET, UPDATE_ORIGIN, UPDATE_BONUS, UPDATE_SKILLS, GET_PREMIUM, UPDATE_TIME,
} from '../actions/profil';

import origins from '../../assets/content/origins';

const defaultState = {
  status: { title: 'Couple', value: 1, ref: 'couple' },
  origin: { title: 'Blanc', value: 1, ref: 'frfr' },
  budget: { title: '$', value: 2, ref: 'poor' },
  skills: [{ title: 'As de Photoshop', id: 'photoshop' },
    { title: 'Psychopathe en Herbe', id: 'psychopathe' }],
  bonus: 0,
  score: 0,
  time: 300,
  premium: false,
};

function returnProfile(status) {
  switch (status) {
    case 'collocation': {
      return { title: 'En colocation', value: 1, ref: 'collocation' };
    }
    case 'single': {
      return { title: 'Seul', value: 2, ref: 'single' };
    }
    case 'couple': {
      return { title: 'En couple', value: 3, ref: 'couple' };
    }
    default:
      return status;
  }
}

function returnBudget(budget) {
  switch (budget) {
    case 'poor': {
      return { title: '€', value: 1, ref: 'poor' };
    }
    case 'regular': {
      return { title: '€€', value: 2, ref: 'regular' };
    }
    case 'rich': {
      return { title: '€€€', value: 3, ref: 'rich' };
    }
    default:
      return budget;
  }
}

function returnOrigin(origin) {
  switch (origin) {
    case 'frmc': {
      const rand = Math.round(Math.random() * ((origins[0].length - 1)));
      return {
        title: origins[0][rand].name, flag: origins[0][rand].flag, value: 1, ref: 'frmc',
      };
    }
    case 'frjp': {
      const rand = Math.round(Math.random() * ((origins[0].length - 1)));
      return {
        title: origins[1][rand].name, flag: origins[1][rand].flag, value: 2, ref: 'frjp',
      };
    }
    case 'frfr': {
      const rand = Math.round(Math.random() * ((origins[0].length - 1)));
      return {
        title: origins[2][rand].name, flag: origins[2][rand].flag, value: 3, ref: 'frfr',
      };
    }
    default:
      return origin;
  }
}

export function profilReducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_STATUS: {
      const newStatus = returnProfile(action.payload);
      const newScore = ((((newStatus.value + state.origin.value + state.budget.value) * 2 + state.bonus) * 5) / 21).toFixed(2);
      return {
        ...state,
        status: newStatus,
        score: newScore,
      };
    }

    case UPDATE_BUDGET: {
      const newBudget = returnBudget(action.payload);
      const newScore = ((((state.status.value + state.origin.value + newBudget.value) * 2 + state.bonus) * 5) / 21).toFixed(2);
      return {
        ...state,
        budget: newBudget,
        score: newScore,
      };
    }

    case UPDATE_ORIGIN: {
      const newOrigin = returnOrigin(action.payload);
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

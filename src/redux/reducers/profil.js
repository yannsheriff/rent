/* eslint-disable import/prefer-default-export */
// import { ACTION } from '../actions/';

import {
  UPDATE_STATUS, UPDATE_BUDGET, UPDATE_ORIGIN, UPDATE_SCORE, UPDATE_SKILLS,
} from '../actions/profil';

const defaultState = {
  status: { title: 'En colocation', value: 1, ref: 'collocation' },
  origin: { title: 'Franco-Français', value: 3, ref: 'frfr' },
  budget: { title: '€€', value: 2, ref: 'regular' },
  skills: [{ title: 'tchatche', id: 0 }, { title: 'psychopathe', id: 1 }],
  score: 0,
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
      return { title: 'Franco-Marocain', value: 1, ref: 'frmc' };
    }
    case 'frjp': {
      return { title: 'Franco-Japonais', value: 2, ref: 'frjp' };
    }
    case 'frfr': {
      return { title: 'Franco-Français', value: 3, ref: 'frfr' };
    }
    default:
      return origin;
  }
}

export function profilReducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_STATUS: {
      const newStatus = returnProfile(action.payload);
      return {
        ...state,
        status: newStatus,
      };
    }

    case UPDATE_BUDGET: {
      const newBudget = returnBudget(action.payload);
      return {
        ...state,
        budget: newBudget,
      };
    }

    case UPDATE_ORIGIN: {
      const newOrigin = returnOrigin(action.payload);
      return {
        ...state,
        origin: newOrigin,
      };
    }

    case UPDATE_SCORE: {
      const newScore = state.score + action.payload;
      return {
        ...state,
        score: newScore,
      };
    }

    case UPDATE_SKILLS: {
      return {
        ...state,
        skills: action.payload,
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

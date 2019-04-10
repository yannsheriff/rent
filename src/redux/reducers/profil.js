/* eslint-disable import/prefer-default-export */
// import { ACTION } from '../actions/';

import { UPDATE_STATUS, UPDATE_BUDGET, UPDATE_ORIGIN } from '../actions/profil';

const defaultState = {
  status: { title: 'En colocation', value: 1 },
  origin: { title: 'Franco-Français', value: 3 },
  budget: { title: '€€', value: 2 },
  skills: [{ title: 'tchatche', id: 0 }, { title: 'psycho', id: 0 }],
  score: 0,
  premium: false,
};

function returnProfile(status) {
  switch (status) {
    case 'collocation': {
      return { title: 'En colocation', value: 1 };
    }
    case 'single': {
      return { title: 'Seul', value: 2 };
    }
    case 'couple': {
      return { title: 'En couple', value: 3 };
    }
    default:
      return status;
  }
}

function returnBudget(budget) {
  switch (budget) {
    case 'cheap': {
      return { title: '€', value: 1 };
    }
    case 'regular': {
      return { title: '€€', value: 2 };
    }
    case 'expensive': {
      return { title: '€€€', value: 3 };
    }
    default:
      return budget;
  }
}

function returnOrigin(origin) {
  switch (origin) {
    case 'frmc': {
      return { title: 'Franco-Marocain', value: 1 };
    }
    case 'frjp': {
      return { title: 'Franco-Japonais', value: 2 };
    }
    case 'frfr': {
      return { title: 'Franco-Français', value: 3 };
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

    // case ACTION:

    //   return {
    //     ...state,
    //   };

    default:
      return state;
  }
}

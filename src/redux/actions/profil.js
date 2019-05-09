export const UPDATE_STATUS = 'UPDATE_STATUS';
export const UPDATE_BUDGET = 'UPDATE_BUDGET';
export const UPDATE_ORIGIN = 'UPDATE_ORIGIN';
export const UPDATE_BONUS = 'UPDATE_BONUS';
export const UPDATE_SKILLS = 'UPDATE_SKILLS';
export const GET_PREMIUM = 'GET_PREMIUM';

export function updateStatus(payload) {
  return {
    type: UPDATE_STATUS,
    payload,
  };
}

export function updateBudget(payload) {
  return {
    type: UPDATE_BUDGET,
    payload,
  };
}

export function updateOrigin(payload) {
  return {
    type: UPDATE_ORIGIN,
    payload,
  };
}

export function updateBonus(payload) {
  return {
    type: UPDATE_BONUS,
    payload,
  };
}

export function updateSkills(payload) {
  return {
    type: UPDATE_SKILLS,
    payload,
  };
}

export function getPremium() {
  return {
    type: GET_PREMIUM,
  };
}

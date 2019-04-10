export const ACTION = 'ACTION';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const UPDATE_BUDGET = 'UPDATE_BUDGET';
export const UPDATE_ORIGIN = 'UPDATE_ORIGIN';

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

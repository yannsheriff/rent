/* eslint-disable import/prefer-default-export */
export function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * ((max - 1) - min) + min);
}

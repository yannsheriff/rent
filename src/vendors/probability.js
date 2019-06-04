/* eslint-disable import/prefer-default-export */

// cette fonction prend une proba sous la forme 0.4
// et effectue un tirage au sort /10 avec 1 - 0.4 = 0.6% de victoire

export function getRandomWithProba(proba) {
  const rand = Math.round(Math.random() * (10 - 1) + 1);
  const globalProba = (1 - (proba * 2)) * 10;
  if (rand <= globalProba) {
    return true;
  }
  return false;
}

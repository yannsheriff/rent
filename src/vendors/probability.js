/* eslint-disable import/prefer-default-export */
export function getRandomWithProba(proba) {
  // console.log('proba' + proba);
  const rand = Math.round(Math.random() * (10 - 1) + 1);
  // console.log('rand' + rand);
  const globalProba = (1 - (proba * 2)) * 10;
  // console.log('il faut que ' + rand + ' soit inferieur ou egal a ' + globalProba);
  if (rand <= globalProba) {
    // console.log("tirage au sort ok");
    return true;
  }
  return false;
}

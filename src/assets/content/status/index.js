import colocLight from './img/coloc-light.svg';
import soloLight from './img/solo-light.svg';
import coupleLight from './img/couple-light.svg';

export default [
  {
    title: 'Seul',
    picto: soloLight,
    pictoLight: soloLight,
    value: 2,
    ref: 'single',
  },
  {
    title: 'En couple',
    picto: coupleLight,
    pictoLight: coupleLight,
    value: 3,
    ref: 'couple',
  },
  {
    title: 'En collocation',
    picto: colocLight,
    pictoLight: colocLight,
    value: 1,
    ref: 'collocation',
  },

];

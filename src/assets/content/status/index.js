import colocLight from './img/coloc-light.svg';
import soloLight from './img/solo-light.svg';
import coupleLight from './img/couple-light.svg';
import coloc from './img/coloc-empty.svg';
import solo from './img/solo-empty.svg';
import couple from './img/couple-empty.svg';

export default [
  {
    id: 1,
    title: 'Seul',
    picto: solo,
    pictoLight: soloLight,
    value: 2,
    ref: 'single',
  },
  {
    id: 2,
    title: 'En couple',
    picto: couple,
    pictoLight: coupleLight,
    value: 3,
    ref: 'couple',
  },
  {
    id: 3,
    title: 'En collocation',
    picto: coloc,
    pictoLight: colocLight,
    value: 1,
    ref: 'collocation',
  },

];

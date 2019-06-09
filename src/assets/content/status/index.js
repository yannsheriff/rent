import colocLight from './img/coloc-light.svg';
import soloLight from './img/solo-light.svg';
import coupleLight from './img/couple-light.svg';
import coloc from './img/coloc-empty.svg';
import solo from './img/solo-empty.svg';
import couple from './img/couple-empty.svg';
import colocWheel from './img/wheel_situation-coloc.svg';
import soloWheel from './img/wheel_situation-solo.svg';
import coupleWheel from './img/wheel_situation-couple.svg';

export default [
  {
    id: 1,
    title: 'Solo',
    picto: solo,
    pictoLight: soloLight,
    pictoWheel: soloWheel,
    value: 2,
    ref: 'single',
  },
  {
    id: 2,
    title: 'En couple',
    picto: couple,
    pictoLight: coupleLight,
    pictoWheel: coupleWheel,
    value: 3,
    ref: 'couple',
  },
  {
    id: 3,
    title: 'En collocation',
    picto: coloc,
    pictoLight: colocLight,
    pictoWheel: colocWheel,
    value: 1,
    ref: 'collocation',
  },

];

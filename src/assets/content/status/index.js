import coloc from './img/coloc-round.svg';
import solo from './img/solo-round.svg';
import couple from './img/couple-round.svg';
import colocWheel from './img/wheel_situation-coloc.svg';
import soloWheel from './img/wheel_situation-solo.svg';
import coupleWheel from './img/wheel_situation-couple.svg';

export default [
  {
    id: 1,
    title: 'solo',
    picto: solo,
    pictoWheel: soloWheel,
    value: 2,
    ref: 'single',
  },
  {
    id: 2,
    title: 'en couple',
    picto: couple,
    pictoWheel: coupleWheel,
    value: 3,
    ref: 'couple',
  },
  {
    id: 3,
    title: 'en collocation',
    picto: coloc,
    pictoWheel: colocWheel,
    value: 1,
    ref: 'collocation',
  },

];

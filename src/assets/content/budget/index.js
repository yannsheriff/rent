import poor from './img/icon_profile_budget_poor.svg';
import regular from './img/icon_profile_budget_regular.svg';
import rich from './img/icon_profile_budget_rich.svg';
import poorWheel from './img/icon_wheel_budget-modeste.svg';
import regularWheel from './img/icon_wheel_budget-moyen.svg';
import richWheel from './img/icon_wheel_budget-eleve.svg';

export default [
  {
    id: 1,
    title: 'Modeste',
    picto: poor,
    pictoLight: poor,
    pictoWheel: poorWheel,
    value: 1,
    ref: 'poor',
  },
  {
    id: 2,
    title: 'Moyen',
    picto: regular,
    pictoLight: regular,
    pictoWheel: regularWheel,
    value: 2,
    ref: 'regular',
  },
  {
    id: 3,
    title: 'Élevé',
    picto: rich,
    pictoLight: rich,
    pictoWheel: richWheel,
    value: 3,
    ref: 'rich',
  },

];

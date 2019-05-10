import poor from './img/icon_profile_budget_poor.svg';
import regular from './img/icon_profile_budget_regular.svg';
import rich from './img/icon_profile_budget_rich.svg';

export default [
  {
    title: '€',
    picto: poor,
    pictoLight: poor,
    value: 1,
    ref: 'poor',
  },
  {
    title: '€€',
    picto: regular,
    pictoLight: regular,
    value: 2,
    ref: 'regular',
  },
  {
    title: '€€€',
    picto: rich,
    pictoLight: rich,
    value: 3,
    ref: 'rich',
  },

];

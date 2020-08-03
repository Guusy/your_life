import moment from 'moment';

export default () => {
  const startOfWeek = moment().startOf('week');
  const endOfWeek = moment().endOf('week');

  const days = [];
  let day = startOfWeek;

  while (day <= endOfWeek) {
    days.push(day);
    day = day.clone().add(1, 'd');
  }

  console.log(days);
  return days;
};

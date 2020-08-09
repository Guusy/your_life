import moment from 'moment';
// https://stackoverflow.com/questions/25588473/how-to-get-list-of-days-in-a-month-with-moment-js/52928379
const getDaysArrayByMonth = (): moment.Moment[] => {
  return Array.from({ length: moment().daysInMonth() }, (x, i) =>
    moment()
      .startOf('month')
      .add(i, 'days')
  );
  let daysInMonth = moment().daysInMonth();
  const arrDays = [];

  while (daysInMonth) {
    const current = moment().date(daysInMonth);
    arrDays.push(current);
    // eslint-disable-next-line no-plusplus
    daysInMonth--;
  }

  return arrDays;
};

export default getDaysArrayByMonth;

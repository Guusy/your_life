import moment from 'moment';
import { Data } from 'react-minimal-pie-chart/types/commonTypes';
import Thought from './Thought';
import getMostFrequentInAList from '../utils/getMostFrequentInAList';
import getDaysOfTheWeek from '../utils/getDaysOfTheWeek';
import getDaysArrayByMonth from '../utils/getDaysOfTheMonth';

export enum RangeFilter {
  week = 'week',
  month = 'month',
  year = 'year'
}

const monthsMap = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];
export default class Calendar {
  thoughts: Thought[];

  constructor({ thoughts }: { thoughts: Thought[] }) {
    this.thoughts = thoughts;
  }

  getAllFelingsOf(range: RangeFilter): string[] {
    let allFeelings = [];
    this.thoughts.forEach(thought => {
      allFeelings = [...allFeelings, ...thought.feelings];
    });
    return Array.from(new Set(allFeelings));
  }

  getListFeelingFromPieChart(range: RangeFilter): Data {
    let allFeelings = [];
    this.thoughts.forEach(thought => {
      allFeelings = [...allFeelings, ...thought.feelings];
    });
    const count = {};
    allFeelings.forEach(i => {
      count[i] = (count[i] || 0) + 1;
    });

    return Object.keys(count).map(key => {
      return {
        title: key,
        value: count[key],
        color: `#${Math.random()
          .toString(16)
          .substr(-6)}`
      };
    });
  }

  getThePrincipalFeelingOf(range: RangeFilter): string {
    return getMostFrequentInAList(this.getAllFelingsOf(range));
  }

  getDays(range: RangeFilter): moment.Moment[] {
    if (range === RangeFilter.week) {
      return getDaysOfTheWeek();
    }
    return getDaysArrayByMonth();
  }

  getThoughtsOf(date: moment.Moment): Thought[] {
    return this.thoughts.filter(
      thought => thought.date === date.format('DD-MM-YYYY')
    );
  }

  static getMonthName(number: number) {
    return monthsMap[number];
  }
}

import moment from 'moment';
import Thought from './Thought';
import getMostFrequentInAList from '../utils/getMostFrequentInAList';
import getDaysOfTheWeek from '../utils/getDaysOfTheWeek';

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

  getThePrincipalFeelingOf(range: RangeFilter): string {
    return getMostFrequentInAList(this.getAllFelingsOf(range));
  }

  getDays(range: RangeFilter): moment.Moment[] {
    return getDaysOfTheWeek();
  }

  static getMonthName(number: number) {
    return monthsMap[number];
  }
}

import moment from 'moment';
import { Data } from 'react-minimal-pie-chart/types/commonTypes';
import getMostFrequentInAList from '../utils/getMostFrequentInAList';
import getDaysOfTheWeek from '../utils/getDaysOfTheWeek';
import getDaysArrayByMonth from '../utils/getDaysOfTheMonth';
import { Feeling, Situation, Thought } from '../graphql/API';

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

  situations: Situation[];

  feelings: Feeling[];

  constructor({
    thoughts,
    situations,
    feelings
  }: {
    thoughts: Thought[];
    situations: Situation[];
    feelings: Feeling[];
  }) {
    this.thoughts = thoughts;
    this.situations = situations;
    this.feelings = feelings;
  }

  getAllFelingsOf(range: RangeFilter): string[] {
    let allFeelings = [];
    this.thoughts.forEach(thought => {
      allFeelings = [...allFeelings, ...thought.feelings];
    });
    return Array.from(new Set(allFeelings));
  }

  getListFeelingFromPieChart(range: RangeFilter = null): Data {
    let allFeelings = [];
    this.thoughts.forEach(thought => {
      allFeelings = [...allFeelings, ...thought.feelings];
    });

    this.situations.forEach(situation => {
      allFeelings = [...allFeelings, ...situation.feelings];
    });

    const count = {};
    allFeelings.forEach(i => {
      count[i] = (count[i] || 0) + 1;
    });

    return Object.keys(count).map(key => {
      const value = count[key];
      console.log(key)
      return {
        title: key,
        value,
        color: this._getColor(key)
      };
    });
  }

  _getColor(feelingId: string): string {
    console.log('this', this.feelings)
    const feeling = this.feelings.find(
      feelingC => feelingC.feeling === feelingId
    );
    return feeling ? feeling.color : 'black';
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

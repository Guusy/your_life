import Thought from './Thought';
import Situation from './Situation';

export default class User {
  customFeelings: { feeling: string; color: string }[] = [];

  thoughts: Thought[];

  situations: Situation[];

  goals: any[];

  static fromJson(json: any): User {
    return Object.assign(new User(), json);
  }
}

export const defaultFeelings = [
  { feeling: 'enojo', color: 'red' },
  { feeling: 'tristeza', color: 'blue' },
  { feeling: 'ansiedad', color: 'yellow' },
  { feeling: 'felicidad', color: 'green' },
  { feeling: 'decepción', color: 'violet' }
];

import Thought from './Thought';
import Situation from './Situation';

export default class User {
  customFeelings: string[] = [];

  thoughts: Thought[];

  situations: Situation[];

  goals: any[];

  static fromJson(json: any): User {
    return Object.assign(new User(), json);
  }
}

import Thought from './Thought';

export default class User {
  customFeelings: string[] = [];

  thoughts: Thought[];

  static fromJson(json: any): User {
    return Object.assign(new User(), json);
  }
}

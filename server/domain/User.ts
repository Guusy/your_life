export default class User {
  customFeelings: string[] = [];

  static fromJson(json: any): User {
    return Object.assign(new User(), json);
  }
}

export default class Mood {
  title: string;

  feelings: [string];

  description: string;

  date: string;

  static fromJson(json: any): Mood {
    const object = Object.assign(new Mood(), json);
    return object;
  }
}

export default class Situation {
  title: string;

  description: string;

  place: { id: string };

  from: string;

  to: string;

  feelings: string[];

  edge: { edgeId: string; modifier: number };
}

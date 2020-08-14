
export class Edge {
  id: string
  label: string
}

export default class Thought {
  title: string;

  description: string;

  feelings: string[];

  edges: Edge[];

  date: string;
}

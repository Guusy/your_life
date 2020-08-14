import Mood from '../domain/Mood';
import MoodRepository from '../repositories/MoodRepository';
import UserRepository from '../repositories/UserRepository';
import Thought from '../domain/Thought';

interface addMoodArgs {
  _id: string;
  input: Mood;
}

interface addCustomFeeling {
  _id: string;
  input: { feeling: string };
}
interface AddThought {
  _id: string;
  input: Thought;
}

interface CreateEdge {
  _id: string;
  input: { label: string };
}

export default {
  addMood: (root, { _id, input }: addMoodArgs): Promise<Mood> => {
    return MoodRepository.addMood(_id, input);
  },

  addCustomFeeling(root, { _id, input }: addCustomFeeling): Promise<any> {
    return UserRepository.addCustomFeeling(_id, input.feeling).then(_ => 'ok');
  },
  addThought(root, { _id, input }: AddThought): Promise<any> {
    return UserRepository.addThought(_id, input).then(_ => input);
  },
  createEdge(root, { _id, input }: CreateEdge) : Promise<any> {
    const newEdge = { ...input,id: input.label.toLowerCase()}
    return UserRepository.createEdge(_id, newEdge).then(() => newEdge)
  }
};

import Mood from '../domain/Mood';
import MoodRepository from '../repositories/MoodRepository';
import UserRepository from '../repositories/UserRepository';

interface addMoodArgs {
  _id: string;
  input: Mood;
}

interface addCustomFeeling {
  _id: string;
  input: { feeling: string };
}

export default {
  addMood: (root, { _id, input }: addMoodArgs): Promise<Mood> => {
    return MoodRepository.addMood(_id, input);
  },

  addCustomFeeling(root, { _id, input }: addCustomFeeling): Promise<any> {
    return UserRepository.addCustomFeeling(_id, input.feeling).then(_ => 'ok');
  }
};

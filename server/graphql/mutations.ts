import Mood from '../domain/Mood';
import MoodRepository from '../repositories/MoodRepository';

interface addMoodArgs {
  _id: string;
  input: Mood;
}
export default {
  addMood: (root, { _id, input }: addMoodArgs): Promise<Mood> => {
    console.log('input, addMood', input);
    return MoodRepository.addMood(_id, input);
  }
};

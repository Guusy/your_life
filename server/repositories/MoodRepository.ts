/* eslint-disable class-methods-use-this */
import { Mongo } from '../db/mongo';
import Mood from '../domain/Mood';

class MoodRepository {
  addMood(userId: string, mood: Mood): Promise<any> {
    return Mongo.usersCollection.updateOne(
      { _id: userId },
      { $push: { moods: mood } }
    );
  }
}

export default new MoodRepository();

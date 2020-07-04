/* eslint-disable class-methods-use-this */
import { Mongo } from '../db/mongo';

class UserRepository {
  getById(userId: string): Promise<any> {
    return Mongo.usersCollection.findOne({ _id: userId });
  }

  addCustomFeeling(userId: string, newFeeling: string) {
    return Mongo.usersCollection.updateOne(
      { _id: userId },
      { $push: { customFeelings: newFeeling } }
    );
  }
}

export default new UserRepository();

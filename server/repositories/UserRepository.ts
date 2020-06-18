/* eslint-disable class-methods-use-this */
import { Mongo } from '../db/mongo';

class UserRepository {
  getById(userId: string): Promise<any> {
    return Mongo.usersCollection.findOne({ _id: userId });
  }
}

export default new UserRepository();

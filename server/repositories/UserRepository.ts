/* eslint-disable class-methods-use-this */
import { Mongo } from '../db/mongo';
import Thought, { Edge } from '../domain/Thought';

class UserRepository {

  createEdge(userId: string, newEdge: Edge) {
    return Mongo.usersCollection.updateOne(
      { _id: userId },
      { $push: { edges: newEdge } }
    );
  }
  
  getById(userId: string): Promise<any> {
    return Mongo.usersCollection.findOne({ _id: userId });
  }

  addCustomFeeling(userId: string, newFeeling: string) {
    return Mongo.usersCollection.updateOne(
      { _id: userId },
      { $push: { customFeelings: newFeeling } }
    );
  }

  addThought(userId: string, thought: Thought): Promise<any> {
    return Mongo.usersCollection.updateOne(
      { _id: userId },
      { $push: { thoughts: thought } }
    );
  }
}

export default new UserRepository();

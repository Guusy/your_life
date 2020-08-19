/* eslint-disable class-methods-use-this */
import { Mongo } from '../db/mongo';
import Thought, { Edge } from '../domain/Thought';
import Situation from '../domain/Situation';

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

  addSituation(userId: string, situation: Situation) {
    return Mongo.usersCollection.updateOne(
      { _id: userId },
      { $push: { situations: situation } }
    );
  }

  addGoal(userId: any, goal: any) {
    return Mongo.usersCollection.updateOne(
      { _id: userId },
      { $push: { goals: goal } }
    );
  }
}

export default new UserRepository();

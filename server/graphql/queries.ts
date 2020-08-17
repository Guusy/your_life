import UserRepository from '../repositories/UserRepository';
import User from '../domain/User';
import { UserDate } from '../domain/UserDate';
import Situation from '../domain/Situation';

export default {
  getUser: (root, { id }) => UserRepository.getById(id),
  getUserAvailableEdges: async (root, { id }) => {
    try {
      // TODO: GONZALO AGREGA LOS TIPOS QUE TE PASA POR LA CABEZA CHABON DIOS.
      const user = await UserRepository.getById(id);
      console.log('hola locoooo', user.edges);
      return user.edges;
    } catch (error) {
      console.log('Se rompio todo en', error);
      throw error;
    }
  },
  getUserAvailableFeelings: (root, { id }): Promise<string[]> => {
    const defaultFeelings = [
      'enojo',
      'tristeza',
      'ansiedad',
      'felicidad',
      'decepción'
    ];
    return UserRepository.getById(id)
      .then(response => User.fromJson(response))
      .then((user: User) => {
        return [...user.customFeelings, ...defaultFeelings];
      });
  },
  getDate: async (root, { id, date }): Promise<UserDate> => {
    const user: User = await UserRepository.getById(id);
    return {
      thoughts: user.thoughts.filter(thought => thought.date === date),
      situations: user.situations.filter(situation => situation.from === date)
    };
  },
  getUserSituations: async (root, { id }): Promise<Situation[]> => {
    // TODO: normalizar data entre la query y la mutation
    const user: User = await UserRepository.getById(id);
    return user.situations;
  }
};

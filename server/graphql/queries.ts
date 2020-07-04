import UserRepository from '../repositories/UserRepository';
import User from '../domain/User';

export default {
  getUser: (root, { id }) => UserRepository.getById(id),
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
  }
};

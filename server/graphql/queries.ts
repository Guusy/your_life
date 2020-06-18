import UserRepository from '../repositories/UserRepository';

export default {
  getUser: (root, { id }) => UserRepository.getById(id)
};

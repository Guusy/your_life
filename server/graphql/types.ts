import UserRepository from '../repositories/UserRepository';

const types = {
  User: {
    __resolveType: (person, context, info) => {
      console.log('21321321321');
      return {
        name: 'gonzalo'
      };
    }
  },
  Mood: {
    __resolveType: (item, context, info) => {
      return [];
    }
  },
  Goal: {
    modifiers: ({ user }, context, info) => {
      // if (user) {
      //
      //   return [{ goal: 'sdasdasd', modifier: 20 }];
      // }
      // TODO: do this
      return [];
    }
  }
};

export default types;

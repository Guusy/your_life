import UserRepository from '../repositories/UserRepository';
import { defaultFeelings } from '../domain/User';

const types = {
  User: {
    __resolveType: (person, context, info) => {
      console.log('21321321321');
      return {
        name: 'gonzalo'
      };
    },
    customFeelings: ({ customFeelings = [] }) => {
      return [...defaultFeelings, ...customFeelings];
    }
  },

  // diversion, triste, incertidumbre
  //   feelings: (props, context, info) => {
  //     console.log('props', props, context, info);
  //     return [];
  //   }
  // },
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

const types = {
  User: {
    __resolveType: (person, context, info) => {
      return {
        name: 'gonzalo'
      };
    }
  },
  Mood: {
    __resolveType: (item, context, info) => {
      return [];
    }
  }
};

export default types;

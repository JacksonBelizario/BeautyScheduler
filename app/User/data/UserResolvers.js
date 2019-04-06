import { UsersCollection } from './UserCollection';

export const UserResolver = {
  Query: {
    async user(root, args, { userId }) {
      return UsersCollection.findOne(userId);
    },
  },

  Mutation: {
    async editUser(root, { user }, { userId }) {
      return UsersCollection.update({ _id: userId }, { $set: { ...user } });
    },

  },

  User: {
    // async address({ _id }) {
    //   return AddressesCollection.findOne({ userId: _id });
    // },
  },
};

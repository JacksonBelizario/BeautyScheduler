import { Meteor } from 'meteor/meteor';

const users = Meteor.users;

Object.assign(users, {
  save({ userId, user }) {
    if (!userId) {
      return this.insert({ ...user });
    }
    this.update(userId, { $set: { ...user } });
    return this.findOne(userId);
  },
});

export { users as UsersCollection };

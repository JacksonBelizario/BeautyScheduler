import { Meteor } from 'meteor/meteor';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const UsersCollection = Meteor.users;

Object.assign(UsersCollection, {
  save({ userId, user }) {
    if (!userId) {
      return this.insert({ ...user });
    }
    this.update(userId, { $set: { ...user } });
    return this.findOne(userId);
  },
});

export const UserTypeDefs = `
type Query {
  user : User
}

type Mutation {
  editUser(user: UserInput!): Boolean
}

input UserInput {
  email: String
  name: String
}

type User {
  _id: ID
  emails: [Email]
  profile: Profile
}

type Profile {
    name: String
}

type Email {
    address: String
    verified: String
}
`;

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

export const editUser = graphql(
    gql`
      mutation editUser($user: UserInput!) {
        editUser(user: $user)
      }
    `,
    { name: 'editUser' }
  );
  
  const USER_QUERY = gql`
    query User {
      user {
        _id
        emails {
          address
          verified
        }
      }
    }
  `;
  
  export const userQuery = graphql(USER_QUERY, {
    name: 'userData',
    options: {
      fetchPolicy: 'cache-and-network',
    },
    props: data => {
      console.log({data});
      return data;
    },
  });
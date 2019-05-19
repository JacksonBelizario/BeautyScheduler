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
  employees: [User]
}

type Mutation {
  editUser(user: UserInput!): Boolean
  createEmployee(email: String, password: String, profile: UserProfile): ID
  editEmployee(id: ID, employee: UserInput): Boolean
  removeEmployee(id: ID): Boolean
}

input EmployeeInput {
  email: String
  password: String
  profile: UserProfile
}

input UserInput {
  profile: UserProfile
  address: AddressInput
}

input UserProfile {
  name: String
  phoneNumber: String
  socialNumber: String
  birthday: String
  gender: String
}

type User {
  _id: ID
  profile: Profile
  emails: [Email]
  address: Address
}

type Profile {
  name: String
  phoneNumber: String
  socialNumber: String
  birthday: String
  gender: String
}

type Email {
  address: String
  verified: String
}

input AddressInput {
  zipcode: String
  street: String
  complement: String
  number: String
  neighborhood: String
  city: String
  state: String
}

type Address {
  zipcode: String
  street: String
  complement: String
  number: String
  neighborhood: String
  city: String
  state: String
}

`;

const usersTypes = {
  EMPLOYEE: 'employee'
}

export const UserResolver = {
  Query: {
    async user(root, args, { userId }) {
      return UsersCollection.findOne(userId);
    },
    async employees() {
        // return UsersCollection.find({type: usersTypes.EMPLOYEE}).fetch();
        return UsersCollection.find().fetch();
    },
  },

  Mutation: {
    async editUser(root, { user }, { userId }) {
      return UsersCollection.update({ _id: userId }, { $set: { ...user } });
    },
    async createEmployee(root, { email, password, profile }) {
        // retorna o id
        // return ServicesCollection.insert(service);
        console.log({email, password, profile});
        const employeeId = Accounts.createUser(
            {
                email,
                password,
                profile,
            }
        );
        console.log({employeeId});
        Roles.addUsersToRoles(employeeId, usersTypes.EMPLOYEE, Roles.GLOBAL_GROUP);
        return true;
    },
    async editEmployee(root, {id, employee}) {
    },
    async removeEmployee(root, { id }) {
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
        profile {
          name
          phoneNumber
          socialNumber
          birthday
          gender
        }
        emails {
          address
          verified
        }
        address {
          zipcode
          street
          complement
          number
          neighborhood
          city
          state
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
      return data;
    },
  });


const EMPLOYEES_QUERY = gql`
  query Employees {
      employees {
          _id
          profile {
            name
            phoneNumber
            socialNumber
            birthday
            gender
          }
          emails {
            address
            verified
          }
      }
  }
`;

export const employeesQuery = graphql(EMPLOYEES_QUERY, {
  name: 'employeesData',
  options: {
      fetchPolicy: 'cache-and-network',
  }
});

const refetchQueries = [{ query: EMPLOYEES_QUERY }];


export const removeEmployeeMutation = graphql(
    gql`
      mutation removeEmployee($id: ID!) {
        removeEmployee(id: $id)
      }
    `,
    {
        name: 'removeEmployee',
        options: { refetchQueries },
    }
);

export const createEmployeeMutation = graphql(
    gql`
    mutation createEmployee($email: String $password: String $profile: UserProfile) {
      createEmployee(email: $email, password: $password, profile: $profile)
    }
  `,
    {
        name: 'createEmployee',
        options: { refetchQueries },
    }
);
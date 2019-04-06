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
  email: String!
  name: String
}
`;

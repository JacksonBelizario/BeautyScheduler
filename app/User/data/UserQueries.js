import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const USER_QUERY = gql`
  query User {
    user {
      _id
      name
      email
    }
  }
`;

export const userQuery = graphql(USER_QUERY, {
  name: 'userData',
  options: {
    fetchPolicy: 'cache-and-network',
  },
});

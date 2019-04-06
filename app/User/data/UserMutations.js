import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const editUser = graphql(
  gql`
    mutation editUser($user: UserInput!) {
      editUser(user: $user)
    }
  `,
  { name: 'editUser' }
);
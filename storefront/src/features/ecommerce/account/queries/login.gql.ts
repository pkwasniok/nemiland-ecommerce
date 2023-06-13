import { graphql } from "@/__graphql__";

export const GQL_MUTATION_LOGIN = graphql(`
  mutation Login($email: String!, $password: String!) {
    login(username: $email, password: $password) {
      __typename
    }
  }
`);

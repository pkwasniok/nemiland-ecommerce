import { graphql } from "@/__graphql__";

export const GQL_MUTATION_LOGOUT = graphql(`
  mutation Logout {
    logout {
      __typename
    }
  }
`);

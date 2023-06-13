import { graphql } from "@/__graphql__";

export const GQL_MUTATION_REGISTER = graphql(`
  mutation Register(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    registerCustomerAccount(
      input: {
        emailAddress: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    ) {
      __typename
    }
  }
`);

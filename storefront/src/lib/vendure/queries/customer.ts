import { graphql } from "@/__graphql__";

export const GQL_MUTATION_REQUEST_PASSWORD_RESET = graphql(`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(emailAddress: $email) {
      __typename
    }
  }
`);

export const GQL_MUTATION_RESET_PASSWORD = graphql(`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, password: $newPassword) {
      __typename
    }
  }
`);

export const GQL_MUTATION_REQUEST_VERIFICATION = graphql(`
  mutation RequestVerification($email: String!) {
    refreshCustomerVerification(emailAddress: $email) {
      __typename
    }
  }
`);

export const GQL_MUTATION_VERIFY = graphql(`
  mutation Verify($token: String!) {
    verifyCustomerAccount(token: $token) {
      __typename
    }
  }
`);

export const GQL_QUERY_ACTIVE_CUSTOMER = graphql(`
  query ActiveCustomer {
    activeCustomer {
      id
      firstName
      lastName
    }
  }
`);

export const GQL_QUERY_ACTIVE_CHANNEL = graphql(`
  query ActiveChannel {
    activeChannel {
      id
    }
  }
`);

export const GQL_MUTATION_UPDATE_CUSTOMER = graphql(`
  mutation UpdateCustomer($firstName: String, $lastName: String!) {
    updateCustomer(input: { firstName: $firstName, lastName: $lastName }) {
      __typename
    }
  }
`);

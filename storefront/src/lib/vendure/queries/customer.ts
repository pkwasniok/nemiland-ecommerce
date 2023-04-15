import { gql } from "@/__graphql__";

export const GQL_MUTATION_REGISTER = gql(`
  mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    registerCustomerAccount(input: {
      firstName: $firstName,
      lastName: $lastName,
      emailAddress: $email,
      password: $password,
    }) {
      __typename,
    }
  }
`);

export const GQL_MUTATION_LOGIN = gql(`
  mutation Login($email: String!, $password: String!) {
    login(username: $email, password: $password) {
      __typename,
    }
  }
`);

export const GQL_MUTATION_LOGOUT = gql(`
  mutation Logout {
    logout {
      __typename,
    }
  }
`);

export const GQL_MUTATION_REQUEST_PASSWORD_RESET = gql(`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(emailAddress: $email) {
      __typename,
    }
  }
`);

export const GQL_MUTATION_RESET_PASSWORD = gql(`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, password: $newPassword) {
      __typename,
    }
  }
`);

export const GQL_MUTATION_REQUEST_VERIFICATION = gql(`
  mutation RequestVerification($email: String!) {
    refreshCustomerVerification(emailAddress: $email) {
      __typename,
    }
  }
`);

export const GQL_MUTATION_VERIFY = gql(`
  mutation Verify($token: String!) {
    verifyCustomerAccount(token: $token) {
      __typename,
    }
  }
`);

export const GQL_QUERY_ACTIVE_CUSTOMER = gql(`
  query ActiveCustomer {
    activeCustomer {
      id,
    }
  }
`);

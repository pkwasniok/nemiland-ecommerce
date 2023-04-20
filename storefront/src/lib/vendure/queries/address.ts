import { graphql } from "@/__graphql__";

export const GQL_QUERY_ADDRESSES = graphql(`
  query Addresses {
    activeCustomer {
      addresses {
        id
        createdAt
        updatedAt
        fullName
        streetLine1
        streetLine2
        city
        province
        postalCode
        country {
          code
          name
        }
        phoneNumber
        defaultShippingAddress
        defaultBillingAddress
      }
    }
  }
`);

export const GQL_MUTATION_CREATE_ADDRESS = graphql(`
  mutation CreateAddress(
    $fullName: String!
    $phoneNumber: String!
    $streetLine1: String!
    $streetLine2: String!
    $city: String!
    $postalCode: String!
  ) {
    createCustomerAddress(
      input: {
        fullName: $fullName
        phoneNumber: $phoneNumber
        streetLine1: $streetLine1
        streetLine2: $streetLine2
        city: $city
        postalCode: $postalCode
        countryCode: "PL"
      }
    ) {
      __typename
    }
  }
`);

export const GQL_MUTATION_UPDATE_ADDRESS = graphql(`
  mutation UpdateAddress(
    $id: ID!
    $fullName: String!
    $phoneNumber: String!
    $streetLine1: String!
    $streetLine2: String!
    $city: String!
    $postalCode: String!
  ) {
    updateCustomerAddress(
      input: {
        id: $id
        fullName: $fullName
        phoneNumber: $phoneNumber
        streetLine1: $streetLine1
        streetLine2: $streetLine2
        city: $city
        postalCode: $postalCode
        countryCode: "PL"
      }
    ) {
      __typename
    }
  }
`);

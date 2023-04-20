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

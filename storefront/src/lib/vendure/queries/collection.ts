import { graphql } from "@/__graphql__";

export const GQL_QUERY_COLLECTIONS = graphql(`
  query Collections {
    collections {
      items {
        id
        createdAt
        updatedAt
        slug
        name
      }
    }
  }
`);

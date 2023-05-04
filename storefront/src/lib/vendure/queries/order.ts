import { graphql } from "@/__graphql__";

export const GQL_MUTATION_ADD_ITEM_TO_ORDER = graphql(`
  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      __typename
    }
  }
`);

export const GQL_QUERY_ACTIVE_ORDER = graphql(`
  query ActiveOrder {
    activeOrder {
      lines {
        unitPriceWithTax
        linePriceWithTax
        quantity
        productVariant {
          name
        }
        featuredAsset {
          source
        }
      }
    }
  }
`);

import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { graphql } from "@/lib/vendure";
import { CollectionPagePropsQuery } from "@/__graphql__/graphql";

import { PageLayout } from "@/features/layout";
import { ProductsGallery } from "@/features/ecommerce";

const CollectionPage = ({
  collection,
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (collection == undefined) return <div></div>;

  return (
    <PageLayout title={`Kolekcja ${collection.name}`}>
      <ProductsGallery
        products={products.map((product) => ({
          href: `/product/${product.slug}`,
          imageSource: product.productAsset?.preview,
          name: product.productName,
          description: "Workoplecak",
          price: product.priceWithTax.value ?? product.priceWithTax.min,
        }))}
      />
    </PageLayout>
  );
};

export default CollectionPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const client = new ApolloClient({
    uri: "http://localhost:3000/shop-api",
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  const response = await client.query({
    query: GQL_QUERY_PAGE_COLLECTION_PATHS,
  });
  const collections = response.data.collections.items;

  return {
    fallback: true,
    paths: collections.map((collection) => ({
      params: { slug: collection.slug },
    })),
  };
};

const GQL_QUERY_PAGE_COLLECTION_PATHS = graphql(`
  query CollectionPagePaths {
    collections {
      items {
        slug
      }
    }
  }
`);

export const getStaticProps: GetStaticProps<
  {
    collection: NonNullable<CollectionPagePropsQuery["collection"]>;
    products: NonNullable<CollectionPagePropsQuery["search"]["items"]>;
  },
  { slug: string }
> = async ({ params }) => {
  const client = new ApolloClient({
    uri: "http://localhost:3000/shop-api",
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  if (params?.slug == undefined) {
    return {
      notFound: true,
    };
  }

  const response = await client.query({
    query: GQL_QUERY_PAGE_COLLECTION_PROPS,
    variables: { slug: params.slug },
  });
  const collection = response.data.collection ?? undefined;
  const products = response.data.search.items ?? undefined;

  if (collection == undefined) {
    return {
      revalidate: 60,
      notFound: true,
    };
  }

  return {
    revalidate: 60,
    props: { collection, products },
  };
};

const GQL_QUERY_PAGE_COLLECTION_PROPS = graphql(`
  query CollectionPageProps($slug: String!) {
    collection(slug: $slug) {
      id
      createdAt
      updatedAt
      slug
      name
    }
    search(input: { collectionSlug: $slug, groupByProduct: true }) {
      items {
        slug
        productId
        productName
        productAsset {
          id
          preview
        }
        priceWithTax {
          ... on SinglePrice {
            value
          }
          ... on PriceRange {
            min
            max
          }
        }
      }
    }
  }
`);

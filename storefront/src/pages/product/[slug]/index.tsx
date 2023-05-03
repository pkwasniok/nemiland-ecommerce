import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { graphql } from "@/lib/vendure";
import { ProductPagePropsQuery } from "@/__graphql__/graphql";

import { PageLayout } from "@/features/layout";

const ProductPage = ({
  product,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  if (product == undefined) return <div></div>;

  return <PageLayout title={`Produkt ${product.name}`} showTitle></PageLayout>;
};

export default ProductPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const client = new ApolloClient({
    uri: "http://localhost:3000/shop-api",
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  const response = await client.query({
    query: GQL_QUERY_PAGE_PRODUCT_PATHS,
  });
  const products = response.data.products.items;

  return {
    fallback: true,
    paths: products.map((product) => ({ params: { slug: product.slug } })),
  };
};

const GQL_QUERY_PAGE_PRODUCT_PATHS = graphql(`
  query ProductPagePaths {
    products {
      items {
        slug
      }
    }
  }
`);

export const getStaticProps: GetStaticProps<
  {
    product: NonNullable<ProductPagePropsQuery["product"]>;
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
    query: GQL_QUERY_PAGE_PRODUCT_PROPS,
    variables: { slug: params.slug },
  });
  const product = response.data.product ?? undefined;

  if (product == undefined) {
    return {
      revalidate: 60,
      notFound: true,
    };
  }

  return {
    revalidate: 60,
    props: { product },
  };
};

const GQL_QUERY_PAGE_PRODUCT_PROPS = graphql(`
  query ProductPageProps($slug: String!) {
    product(slug: $slug) {
      id
      createdAt
      updatedAt
      slug
      name
    }
  }
`);

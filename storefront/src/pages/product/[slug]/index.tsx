import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { graphql } from "@/lib/vendure";
import { ProductPagePropsQuery } from "@/__graphql__/graphql";

import { Image, Price } from "@/features/utils";
import { PageLayout } from "@/features/layout";
import { AspectRatio, Box, Button, Flex, Text } from "@chakra-ui/react";

const ProductPage = ({
  product,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  if (product == undefined) return <div></div>;

  console.log(product.facetValues);

  return (
    <PageLayout title={`Produkt ${product.name}`}>
      {product.assets.length > 0 && (
        <AspectRatio ratio={1} bgColor="gray.50" borderRadius={6}>
          <Image
            src={product.assets[0].source}
            width={500}
            height={500}
            alt=""
          />
        </AspectRatio>
      )}

      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={0}>
          {product.facetValues.find(
            (facetValue) => facetValue.facet.code == "category"
          ) != undefined && (
            <Text fontSize="xs">
              {
                product.facetValues.find(
                  (facetValue) => facetValue.facet.code == "category"
                )?.name
              }
            </Text>
          )}

          <Text fontSize="2xl" fontWeight="semibold" textColor="black">
            {product.name.toUpperCase()}
          </Text>
        </Flex>

        <Price fontSize="2xl" price={12000} />

        <Box h={4} />

        <Button colorScheme="green">Dodaj do koszyka</Button>

        <Box h={4} />
      </Flex>
    </PageLayout>
  );
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
      slug
      name
      description
      assets {
        source
      }
      facetValues {
        facet {
          code
          name
        }
        code
        name
      }
      collections {
        name
        slug
      }
    }
  }
`);

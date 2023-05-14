import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { graphql } from "@/lib/vendure";
import { CollectionPagePropsQuery } from "@/__graphql__/graphql";

import { Image, Price } from "@/features/utils";
import NextLink from "next/link";
import { PageLayout } from "@/features/layout";
import {
  Box,
  SimpleGrid,
  AspectRatio,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";

const CollectionPage = ({
  collection,
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (collection == undefined) return <div></div>;

  return (
    <PageLayout title={`Kolekcja ${collection.name}`}>
      <SimpleGrid columns={4} gap={6}>
        {products.map((product, index) => (
          <Flex
            key={index}
            direction="column"
            borderRadius={6}
            bgColor="white"
            as={NextLink}
            href={`/product/${product.slug}`}
          >
            <AspectRatio
              width="100%"
              ratio={1}
              borderRadius={6}
              bgColor="green.100"
            >
              <Image
                src={product.productAsset?.preview}
                width={500}
                height={500}
                alt=""
              />
            </AspectRatio>

            <Flex p={6} justifyContent="space-between" alignItems="end">
              <Flex direction="column">
                <Text fontSize="sm" textColor="gray.600">
                  Workoplecak
                </Text>
                <Text lineHeight={1} fontWeight="semibold">
                  {product.productName.toUpperCase()}
                </Text>
              </Flex>

              <Price
                fontWeight="semibold"
                price={product.priceWithTax.value ?? product.priceWithTax.min}
              />
            </Flex>
          </Flex>
        ))}
      </SimpleGrid>

      {/* <SimpleGrid columns={[1, 2, 3, 4]} gap={4}>
        {products.map((product, index) => (
          <Box key={index} bgColor="green.50" borderRadius={6}>
            <NextLink href={`/product/${product.slug}`}>
              {product.productAsset != undefined && (
                <AspectRatio ratio={1}>
                  <Image
                    src={product.productAsset.preview}
                    width={500}
                    height={500}
                    alt=""
                  />
                </AspectRatio>
              )}

              <VStack pb={4} spacing={1}>
                <VStack spacing={0}>
                  <Text fontSize="xs">{collection.name}</Text>
                  <Text fontWeight="semibold" textColor="black">
                    {product.productName.toUpperCase()}
                  </Text>
                </VStack>

                <Price
                  price={
                    product.priceWithTax.__typename == "PriceRange"
                      ? product.priceWithTax.min
                      : 0
                  }
                />
              </VStack>
            </NextLink>
          </Box>
        ))}
      </SimpleGrid> */}
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

import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";

import { ApolloClient, InMemoryCache, useMutation } from "@apollo/client";
import { GQL_MUTATION_ADD_ITEM_TO_ORDER, graphql } from "@/lib/vendure";
import { ProductPagePropsQuery } from "@/__graphql__/graphql";

import { Image, Price } from "@/features/utils";
import { PageLayout } from "@/features/layout";
import {
  useToast,
  AspectRatio,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FiTruck, FiDollarSign } from "react-icons/fi";

const ProductPage = ({
  product,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const toast = useToast();

  const [addItemToOrderMutation] = useMutation(GQL_MUTATION_ADD_ITEM_TO_ORDER, {
    onCompleted: (data) => {
      const result = data.addItemToOrder.__typename;
      console.log(result);
      if (result == "Order") {
        toast({
          title: "Dodano do koszyka",
          status: "success",
        });
      } else if (result == "InsufficientStockError") {
        toast({
          title: "Nie można dodać do koszyka",
          description: "Niewystarczająca ilość w magazynie",
          status: "warning",
        });
      }
    },
  });

  const addItemToOrder = () => {
    addItemToOrderMutation({
      variables: {
        productVariantId: product.variants[0].id,
        quantity: 1,
      },
    });
  };

  if (product == undefined) return <div></div>;

  return (
    <PageLayout title={product.name}>
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
              {product.facetValues
                .find((facetValue) => facetValue.facet.code == "category")
                ?.name.toUpperCase()}
            </Text>
          )}

          <Text fontSize="2xl" fontWeight="semibold" textColor="black">
            {product.name.toUpperCase()}
          </Text>
        </Flex>

        <Price fontSize="2xl" price={12000} />

        <Box h={1} />

        <Button colorScheme="green" onClick={addItemToOrder}>
          Dodaj do koszyka
        </Button>

        <Box h={1} />

        <Box>
          <Flex
            direction="column"
            border="1px"
            borderRadius={6}
            borderColor="gray.200"
          >
            <Flex
              direction="row"
              gap={2}
              py={1}
              px={2}
              fontSize="sm"
              alignItems="center"
              textColor="gray.700"
            >
              <FiTruck />
              Dostawa w 24h
            </Flex>

            <Divider />

            <Flex
              direction="row"
              gap={2}
              py={1}
              px={2}
              fontSize="sm"
              alignItems="center"
              textColor="gray.700"
            >
              <FiDollarSign />
              Szybkie płatności Przelewy24
            </Flex>

            <Divider />

            <Flex
              direction="row"
              gap={2}
              py={1}
              px={2}
              fontSize="sm"
              alignItems="center"
              textColor="gray.700"
            >
              Wysyłka do Paczkomat InPost
            </Flex>
          </Flex>
        </Box>

        <Box h={1} />

        <Flex direction="column" gap={2}>
          <Heading size="sm">Opis</Heading>
          <Divider />
          <Box dangerouslySetInnerHTML={{ __html: product.description }} />
        </Flex>
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
      id
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
      variants {
        id
        name
      }
      collections {
        name
        slug
      }
    }
  }
`);

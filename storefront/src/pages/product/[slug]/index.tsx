import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";

import { ApolloClient, InMemoryCache, useMutation } from "@apollo/client";
import {
  GQL_MUTATION_ADD_ITEM_TO_ORDER,
  GQL_QUERY_ACTIVE_ORDER,
  graphql,
} from "@/lib/vendure";
import { ProductPagePropsQuery } from "@/__graphql__/graphql";

import { Image, Price } from "@/features/utils";
import { PageLayout } from "@/features/layout";
import {
  useToast,
  AspectRatio,
  Button,
  Flex,
  Text,
  Badge,
  Divider,
  Box,
} from "@chakra-ui/react";
import { FiPackage, FiTruck, FiDollarSign } from "react-icons/fi";

const ProductPage = ({
  product,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const toast = useToast();

  const [addItemToOrderMutation] = useMutation(GQL_MUTATION_ADD_ITEM_TO_ORDER, {
    refetchQueries: [GQL_QUERY_ACTIVE_ORDER],
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
      <Flex minH="inherit" flex={1} direction="row">
        <Flex
          flex={1}
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <AspectRatio w="100%" ratio={1} bgColor="green.200" border="1px">
            <div>A</div>
          </AspectRatio>
        </Flex>

        <Flex
          flex={1}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Flex maxW="450px" w="100%" direction="column" gap={10}>
            <Flex direction="row" flexWrap="wrap" gap={2}>
              <Badge colorScheme="yellow">NOWOŚĆ</Badge>
              <Badge colorScheme="red">PROMOCJA</Badge>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center">
              <Flex direction="column">
                <Text>Workoplecak</Text>
                <Text lineHeight={0.9} fontSize="2xl" fontWeight="semibold">
                  CYTRYNA
                </Text>
              </Flex>

              <Flex>
                <Text fontSize="2xl" fontWeight="bold">
                  Nemiland
                </Text>
              </Flex>
            </Flex>

            <Flex direction="column">
              <Text fontSize="2xl" fontWeight="semibold">
                120,00 PLN
              </Text>

              <Text fontSize="xs" textColor="gray.500">
                Najniższa cena z ostatnich 30 dni: 120,00 PLN
              </Text>
            </Flex>

            <Flex direction="column">
              <Button size="lg" colorScheme="green">
                Dodaj do koszyka
              </Button>
            </Flex>

            <Flex
              direction="column"
              border="1px"
              borderColor="gray.300"
              fontSize="sm"
              fontWeight="medium"
              textColor="gray.600"
              borderRadius={6}
            >
              <Flex px={2} py={1} alignItems="center" gap={2}>
                <FiPackage />
                <Flex gap={1}>
                  <Text>Dostępność:</Text>
                  <Text textColor="green.600">w magazynie</Text>
                </Flex>
              </Flex>

              <Divider />

              <Flex px={2} py={1} alignItems="center" gap={2}>
                <FiTruck />
                Wysyłka do Paczkomat InPost
              </Flex>

              <Divider />

              <Flex px={2} py={1} alignItems="center" gap={2}>
                <FiDollarSign />
                Szybkie płatności Przelewy24
              </Flex>
            </Flex>
          </Flex>
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

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

import { PageLayout } from "@/features/layout";
import { useToast, AspectRatio, Flex, Text, Box } from "@chakra-ui/react";
import { FiPackage, FiTruck, FiDollarSign } from "react-icons/fi";

import { Product } from "@/features/ecommerce";

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
      <Flex
        minHeight="92vh"
        direction={["column", "column", "column", "row"]}
        gap={[4, 4, 4, 10]}
      >
        <Flex
          flex={[0, 0, 0, 1]}
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Product.Gallery />
        </Flex>

        <Flex
          flex={[0, 0, 0, 1]}
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Flex maxW="450px" w="100%" direction="column" gap={10}>
            <Product.Badges
              badges={[{ label: "Nowość" }, { label: "Promocja" }]}
            />

            <Product.Title
              productName={product.name}
              categoryName={
                product.facetValues.find(
                  (facetValue) => facetValue.facet.code == "category"
                )?.name
              }
              logo={
                <Text fontSize="2xl" fontWeight="bold">
                  Nemiland
                </Text>
              }
            />

            <Product.Price
              currentPrice={product.variants[0].price}
              lowestPrice={product.variants[0].price}
            />

            <Product.ATCButton />

            <Product.DetailsTable>
              <Product.DetailsRow icon={<FiPackage />}>
                Dostępność: <Text textColor="green.700">w magazynie</Text>
              </Product.DetailsRow>
              <Product.DetailsRow icon={<FiTruck />}>
                Wysyłka do Paczkomat InPost
              </Product.DetailsRow>
              <Product.DetailsRow icon={<FiDollarSign />}>
                Szybkie płatności Przelewy24
              </Product.DetailsRow>
            </Product.DetailsTable>
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" p={6} bgColor="white" gap={3} borderRadius={6}>
        <Text fontSize="lg" fontWeight="semibold">
          Opis produktu
        </Text>

        {product.description && (
          <Box dangerouslySetInnerHTML={{ __html: product.description }}></Box>
        )}

        {!product.description && <Box>Lorem ipsum</Box>}
      </Flex>

      <Flex direction="column" p={6} bgColor="white" gap={3} borderRadius={6}>
        <Text fontSize="lg" fontWeight="semibold">
          Ważne informacje
        </Text>

        <Text>Lorem ipsum</Text>
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
        price
        currencyCode
      }
      collections {
        name
        slug
      }
    }
  }
`);

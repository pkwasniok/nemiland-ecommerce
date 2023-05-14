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
import { useToast, Flex, Text, Box } from "@chakra-ui/react";
import { Product } from "@/features/ecommerce";
import { StockLevel } from "@/features/utils";

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
      <Flex direction="column" gap={6}>
        <Flex
          height={["", "", "", "92vh"]}
          direction={["column", "column", "column", "row"]}
          gap={6}
        >
          <Flex flex={[0, 0, 0, 1]} direction="column" justifyContent="center">
            <Product.Gallery
              images={product.assets.map((asset) => ({ src: asset.source }))}
            />
          </Flex>

          <Flex
            flex={[0, 0, 0, 1]}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Flex
              maxW={["", "", "", "470px"]}
              w="100%"
              p={6}
              direction="column"
              gap={10}
              borderRadius={6}
              bgColor="white"
            >
              {product.facetValues.filter(
                (facetValue) => facetValue.facet.code == "badge"
              ).length > 0 && (
                <Product.Badges
                  badges={product.facetValues
                    .filter((facetValue) => facetValue.facet.code == "badge")
                    .map((facetValue) => ({
                      label: facetValue.name.toUpperCase(),
                    }))}
                />
              )}

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

              <Product.ATCButton onClick={addItemToOrder} />

              <Product.DetailsTable>
                <Product.DetailsRow icon={<FiPackage />}>
                  Dostępność:{" "}
                  <StockLevel stockLevel={product.variants[0].stockLevel} />
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

        <Flex p={6} direction="column" gap={3} borderRadius={6} bgColor="white">
          <Text fontSize="lg" fontWeight="semibold">
            Opis produktu
          </Text>

          {product.description ? (
            <Box
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></Box>
          ) : (
            <Text>Brak opisu</Text>
          )}
        </Flex>

        <Flex p={6} direction="column" gap={3} borderRadius={6} bgColor="white">
          <Text fontSize="lg" fontWeight="semibold">
            Ważne informacje
          </Text>

          <Text>Lorem ipsum.</Text>
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
        price
        currencyCode
        stockLevel
      }
      collections {
        name
        slug
      }
    }
  }
`);

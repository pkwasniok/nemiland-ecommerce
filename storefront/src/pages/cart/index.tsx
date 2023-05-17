import { useMutation, useQuery } from "@apollo/client";
import {
  GQL_MUTATION_ADJUST_ORDER_LINE,
  GQL_QUERY_ACTIVE_ORDER,
} from "@/lib/vendure";
import NextLink from "next/link";

import { PageLayout } from "@/features/layout";
import { Flex, Text, Button, Heading } from "@chakra-ui/react";
import { Cart } from "@/features/ecommerce";

import { FiInfo } from "react-icons/fi";

const CartPage = () => {
  const { data: activeOrderData } = useQuery(GQL_QUERY_ACTIVE_ORDER);
  const activeOrder = activeOrderData?.activeOrder ?? undefined;

  const [adjustOrderLineMutation] = useMutation(
    GQL_MUTATION_ADJUST_ORDER_LINE,
    {
      refetchQueries: [GQL_QUERY_ACTIVE_ORDER],
    }
  );

  const adjustOrderLine = (id: string, quantity: number) => {
    adjustOrderLineMutation({
      variables: {
        orderLineId: id,
        quantity: quantity,
      },
    });
  };

  if (activeOrder == undefined || activeOrder.lines.length == 0) {
    return (
      <PageLayout title="Koszyk" showTitle>
        <Flex height="85vh" alignItems="center" justifyContent="center">
          <Text fontSize="lg" fontWeight="semibold">
            Twój koszyk jest pusty
          </Text>
        </Flex>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Koszyk" showTitle>
      <Heading size="md">Koszyk</Heading>

      <Flex direction={["column", "column", "column", "row"]} gap={6}>
        <Flex w="100%" direction="column" gap={6}>
          {activeOrder.lines.map((orderLine, index) => (
            <Cart.OrderLine
              key={index}
              src={orderLine.featuredAsset?.source}
              name={`Workoplecak ${orderLine.productVariant.name.toUpperCase()}`}
              quantity={orderLine.quantity}
              price={orderLine.linePriceWithTax}
              onQuantityChange={(quantity) =>
                adjustOrderLine(orderLine.id, quantity)
              }
            />
          ))}
        </Flex>

        <Flex
          maxW={["", "", "", "450px"]}
          width="100%"
          direction="column"
          gap={6}
        >
          <Flex
            p={6}
            direction="column"
            gap={6}
            borderRadius={6}
            bgColor="white"
          >
            <Cart.PriceSummary
              itemsPrice={activeOrder.subTotalWithTax}
              shippingPrice={1200}
            />

            <Button
              size="lg"
              colorScheme="green"
              as={NextLink}
              href="/checkout"
            >
              Przejdź do kasy
            </Button>

            <Flex
              px={1}
              alignItems="center"
              gap={1}
              fontSize={["xs", "sm", "sm", "sm"]}
              textColor="gray.600"
            >
              <FiInfo />
              <Text>Przed zakupem zapoznaj się z regulaminem sklepu</Text>
            </Flex>
          </Flex>

          <Flex
            p={6}
            direction="column"
            gap={6}
            borderRadius={6}
            bgColor="white"
          >
            <Flex direction="column">
              <Text fontSize="sm">Dostępne metody płatności:</Text>
              <Flex p={1} flexWrap="wrap" direction="row" gap={3}>
                <img width="50px" src="/blik.png" />
                <img width="50px" src="/blik.png" />
                <img width="50px" src="/blik.png" />
              </Flex>
            </Flex>

            <Flex direction="column">
              <Text fontSize="sm">Dostępne metody wysyłki:</Text>

              <Flex p={1} flexWrap="wrap" direction="row" gap={3}>
                <img width="50px" src="/inpost_kurier.png" />
                <img width="50px" src="/inpost_kurier.png" />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </PageLayout>
  );
};

export default CartPage;

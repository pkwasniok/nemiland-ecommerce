import { useMutation, useQuery } from "@apollo/client";
import {
  GQL_MUTATION_ADJUST_ORDER_LINE,
  GQL_QUERY_ACTIVE_ORDER,
} from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import { Image, Price } from "@/features/utils";
import {
  AspectRatio,
  Flex,
  Text,
  IconButton,
  Spacer,
  Button,
  Box,
  Divider,
} from "@chakra-ui/react";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";

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
        Koszyk jest pusty
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Koszyk" showTitle>
      {activeOrder.lines.map((orderLine, index) => (
        <Flex key={index} gap={2}>
          <AspectRatio
            ratio={1}
            width="100px"
            bgColor="gray.50"
            borderRadius={6}
          >
            <Image
              src={orderLine.featuredAsset!.source}
              width={100}
              height={100}
              alt=""
            />
          </AspectRatio>

          <Flex flex={1} py={2} direction="column" gap={0}>
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontWeight="semibold">
                {orderLine.productVariant.name.toUpperCase()}
              </Text>

              <Price price={orderLine.linePriceWithTax} />
            </Flex>

            <Price fontSize="sm" price={orderLine.unitPriceWithTax} />

            <Spacer />

            <Flex alignItems="center" gap={2}>
              <IconButton
                icon={<FiMinus />}
                aria-label="-"
                size="xs"
                onClick={() =>
                  adjustOrderLine(orderLine.id, orderLine.quantity - 1)
                }
              />
              <Text w="18px" textAlign="center">
                {orderLine.quantity}
              </Text>
              <IconButton
                icon={<FiPlus />}
                aria-label="+"
                size="xs"
                onClick={() =>
                  adjustOrderLine(orderLine.id, orderLine.quantity + 1)
                }
              />
            </Flex>
          </Flex>
        </Flex>
      ))}

      <Spacer />

      <Box>
        <Flex direction="column" gap={1} fontSize="sm">
          <Flex justifyContent="space-between" alignItems="end">
            <Text>Przedmioty</Text>
            <Price fontSize="lg" price={activeOrder.subTotalWithTax} />
          </Flex>

          <Flex justifyContent="space-between" alignItems="end">
            <Text>Wysyłka</Text>
            <Text fontSize="lg">od 12,00 PLN</Text>
          </Flex>

          <Divider />

          <Flex
            justifyContent="space-between"
            alignItems="end"
            fontWeight="semibold"
          >
            <Text>Suma</Text>
            <Price fontSize="xl" price={activeOrder.subTotalWithTax + 1200} />
          </Flex>
        </Flex>
      </Box>

      <Button colorScheme="green">Przejdź do kasy</Button>
    </PageLayout>
  );
};

export default CartPage;

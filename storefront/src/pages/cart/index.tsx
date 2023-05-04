import { useQuery } from "@apollo/client";
import { GQL_QUERY_ACTIVE_ORDER } from "@/lib/vendure";

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

              <IconButton
                icon={<FiX size={16} />}
                aria-label="Delete item"
                size="xs"
                variant="ghost"
              />
            </Flex>

            <Price fontSize="lg" price={12000} />

            <Spacer />

            <Flex alignItems="center" gap={2}>
              <IconButton icon={<FiMinus />} aria-label="-" size="xs" />
              <Text w="18px" textAlign="center">
                {orderLine.quantity}
              </Text>
              <IconButton icon={<FiPlus />} aria-label="+" size="xs" />
            </Flex>
          </Flex>
        </Flex>
      ))}

      <Spacer />

      <Box>
        <Flex direction="column" gap={1} fontSize="sm">
          <Flex justifyContent="space-between" alignItems="end">
            <Text>Przedmioty</Text>
            <Text fontSize="lg">120,00 PLN</Text>
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
            <Text fontSize="xl">112,00 PLN</Text>
          </Flex>
        </Flex>
      </Box>

      <Button colorScheme="green">Przejdź do kasy</Button>
    </PageLayout>
  );
};

export default CartPage;

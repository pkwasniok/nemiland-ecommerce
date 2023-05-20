import { Price } from "@/features/utils";
import { Flex, Text, Divider } from "@chakra-ui/react";

interface CheckoutPriceSummaryProps {
  productsPrice: number;
  shippingPrice: number;
}

const CheckoutPriceSummary = ({
  productsPrice,
  shippingPrice,
}: CheckoutPriceSummaryProps) => {
  return (
    <Flex direction="column" gap={2}>
      <Flex justifyContent="space-between">
        <Text>Produkty</Text>
        <Price price={productsPrice} />
      </Flex>

      <Flex justifyContent="space-between">
        <Text>Dostawa</Text>
        <Price price={shippingPrice} />
      </Flex>

      <Divider />

      <Flex justifyContent="space-between" fontSize="lg" fontWeight="semibold">
        <Text>Suma</Text>
        <Price price={productsPrice + shippingPrice} />
      </Flex>
    </Flex>
  );
};

export default CheckoutPriceSummary;

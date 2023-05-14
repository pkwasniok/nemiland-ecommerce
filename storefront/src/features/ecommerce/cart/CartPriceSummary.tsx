import { Flex, Text, Divider } from "@chakra-ui/react";
import { Price } from "@/features/utils";

interface CartPriceSummaryProps {
  itemsPrice: number;
  shippingPrice: number;
}

const CartPriceSummary = ({
  itemsPrice,
  shippingPrice,
}: CartPriceSummaryProps) => {
  return (
    <Flex direction="column" gap={3}>
      <Flex fontSize={["md", "md", "lg"]} justifyContent="space-between">
        <Text>Produkty</Text>
        <Price price={itemsPrice} />
      </Flex>

      <Flex fontSize={["md", "md", "lg"]} justifyContent="space-between">
        <Text>Dostawa</Text>
        <Price price={shippingPrice} />
      </Flex>

      <Divider />

      <Flex
        fontSize={["md", "md", "lg"]}
        fontWeight="semibold"
        justifyContent="space-between"
      >
        <Text>Łączny koszt</Text>
        <Price price={itemsPrice + shippingPrice} />
      </Flex>
    </Flex>
  );
};

export default CartPriceSummary;

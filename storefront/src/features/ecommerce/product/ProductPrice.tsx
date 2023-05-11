import { Flex } from "@chakra-ui/react";
import { Price } from "@/features/utils";

interface ProductPriceProps {
  currencyCode?: string;
  currentPrice: number;
  lowestPrice: number;
}

const ProductPrice = ({
  currencyCode = "PLN",
  currentPrice,
  lowestPrice,
}: ProductPriceProps) => {
  return (
    <Flex direction="column">
      <Price
        fontSize="2xl"
        fontWeight="semibold"
        price={currentPrice}
        currencyCode={currencyCode}
      />

      <Flex gap={1} fontSize="xs" textColor="gray.500">
        Najniższa cena z ostatnich 30 dni:{" "}
        <Price price={lowestPrice} currencyCode={currencyCode} />
      </Flex>
    </Flex>
  );
};

export default ProductPrice;

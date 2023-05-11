import { ReactNode } from "react";
import { Flex, Text } from "@chakra-ui/react";

interface ProductTitleProps {
  productName: string;
  categoryName?: string;
  logo?: ReactNode;
}

const ProductTitle = ({
  productName,
  categoryName,
  logo,
}: ProductTitleProps) => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex direction="column">
        <Text fontSize="sm">{categoryName}</Text>
        <Text lineHeight={0.9} fontSize="2xl" fontWeight="semibold">
          {productName.toUpperCase()}
        </Text>
      </Flex>

      <Flex>{logo}</Flex>
    </Flex>
  );
};

export default ProductTitle;

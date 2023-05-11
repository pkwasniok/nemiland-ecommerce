import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

interface ProductDetailsRow {
  children?: ReactNode;
  icon?: ReactNode;
}

const ProductDetailsRow = ({ children, icon }: ProductDetailsRow) => {
  return (
    <Flex px={2} py={1} gap={2} alignItems="center">
      {icon}
      <Flex gap={1}>{children}</Flex>
    </Flex>
  );
};

export default ProductDetailsRow;

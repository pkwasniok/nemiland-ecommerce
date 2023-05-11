import { ReactElement } from "react";
import { Flex, Divider } from "@chakra-ui/react";

interface ProductDetailsTableProps {
  children?: ReactElement[];
}

const ProductDetailsTable = ({ children }: ProductDetailsTableProps) => {
  return (
    <Flex
      direction="column"
      border="1px"
      borderColor="gray.300"
      fontSize="sm"
      fontWeight="medium"
      textColor="gray.600"
      borderRadius={6}
    >
      {children?.map((row, index) => (
        <>
          {row}
          {index < children.length - 1 && <Divider />}
        </>
      ))}
    </Flex>
  );
};

export default ProductDetailsTable;

import { Button, ButtonProps } from "@chakra-ui/react";

interface ProductATCButtonProps extends Omit<ButtonProps, "children"> {}

const ProductATCButton = ({ ...props }: ProductATCButtonProps) => {
  return (
    <Button size="lg" colorScheme="green" {...props}>
      Dodaj do koszyka
    </Button>
  );
};

export default ProductATCButton;

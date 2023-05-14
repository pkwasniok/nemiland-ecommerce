import { Text, TextProps } from "@chakra-ui/react";

interface StockLevelProps extends Omit<TextProps, "children"> {
  stockLevel: string;
}

const StockLevel = ({ stockLevel, ...props }: StockLevelProps) => {
  if (stockLevel == "IN_STOCK") {
    return (
      <Text color="green.600" {...props}>
        w magazynie
      </Text>
    );
  } else if (stockLevel == "LOW_STOCK") {
    return (
      <Text color="yellow.500" {...props}>
        ograniczona ilość
      </Text>
    );
  } else {
    return (
      <Text color="red.700" {...props}>
        brak w magaznie
      </Text>
    );
  }
};

export default StockLevel;

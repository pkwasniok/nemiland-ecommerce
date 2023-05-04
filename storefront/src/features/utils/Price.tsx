import { Text, TextProps } from "@chakra-ui/react";

interface PriceProps extends Omit<TextProps, "children"> {
  price: number;
  currencyCode?: string;
}

const Price = ({ price, currencyCode = "PLN", ...props }: PriceProps) => {
  const formatPrice = (price: number) => {
    return (price / 100).toFixed(2).replace(".", ",");
  };

  return (
    <Text {...props}>
      {formatPrice(price)} {currencyCode}
    </Text>
  );
};

export default Price;

import { Image, Price } from "@/features/utils";
import { Flex, AspectRatio, Text } from "@chakra-ui/react";

interface CheckoutOrderLineProps {
  imageSource: string;
  name: string;
  quantity: number;
  price: number;
}

const CheckoutOrderLine = ({
  imageSource,
  name,
  quantity,
  price,
}: CheckoutOrderLineProps) => {
  return (
    <Flex gap={3}>
      <AspectRatio width="60px" ratio={1} borderRadius={3} bgColor="green.100">
        <Image src={imageSource} width={500} height={500} alt="" />
      </AspectRatio>

      <Flex flex={1} direction="column" justifyContent="center">
        <Flex justifyContent="space-between">
          <Text>{name}</Text>
          <Price price={price} />
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontSize="sm" textColor="gray.600">{`Ilość: ${quantity}`}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CheckoutOrderLine;

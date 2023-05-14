import { Flex, AspectRatio, Text, IconButton } from "@chakra-ui/react";
import { Image, Price } from "@/features/utils";

import { FiMinus, FiPlus, FiX } from "react-icons/fi";

interface CartOrderLineProps {
  src: string;
  name: string;
  quantity: number;
  price: number;
  onQuantityChange?: (quantity: number) => void;
}

const CartOrderLine = ({
  src,
  name,
  quantity,
  price,
  onQuantityChange,
}: CartOrderLineProps) => {
  return (
    <Flex width="100%" borderRadius={6} bgColor="white">
      <AspectRatio ratio={1} width="130px" borderRadius={6} bgColor="green.100">
        <Image src={src} width={500} height={500} alt="" />
      </AspectRatio>

      <Flex flex={1} p={6} direction="column" justifyContent="space-between">
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="semibold">{name}</Text>

          <IconButton
            size="xs"
            variant="ghost"
            icon={<FiX size={18} />}
            aria-label="delete"
            onClick={() => onQuantityChange?.(0)}
          />
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <IconButton
              size="xs"
              variant="ghost"
              icon={<FiMinus size={20} />}
              aria-label="decrement"
              onClick={() => onQuantityChange?.(quantity - 1)}
            />

            <Text width="25px" textAlign="center" fontWeight="semibold">
              {quantity}
            </Text>

            <IconButton
              size="xs"
              variant="ghost"
              icon={<FiPlus size={20} />}
              aria-label="increment"
              onClick={() => onQuantityChange?.(quantity + 1)}
            />
          </Flex>

          <Price fontWeight="semibold" price={price} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartOrderLine;

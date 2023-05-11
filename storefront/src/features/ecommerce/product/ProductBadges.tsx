import { Flex, Badge } from "@chakra-ui/react";

interface ProductBadgesProp {
  badges: { label: string }[];
}

const ProductBadges = ({ badges }: ProductBadgesProp) => {
  return (
    <Flex gap={2}>
      {badges.map((badge, index) => (
        <Badge key={index} colorScheme="yellow">
          {badge.label.toUpperCase()}
        </Badge>
      ))}
    </Flex>
  );
};

export default ProductBadges;

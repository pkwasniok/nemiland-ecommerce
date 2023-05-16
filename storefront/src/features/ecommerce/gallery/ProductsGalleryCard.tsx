import { Flex, AspectRatio, Text } from "@chakra-ui/react";
import { Image, Price } from "@/features/utils";

interface ProductsGalleryCardProps {
  imageSource: string;
  name: string;
  description: string;
  price: number;
}

const ProductsGalleryCard = ({
  imageSource,
  name,
  description,
  price,
}: ProductsGalleryCardProps) => {
  return (
    <Flex direction="column" borderRadius={6} bgColor="white">
      <AspectRatio width="100%" ratio={1} borderRadius={6} bgColor="green.100">
        <Image src={imageSource} width={500} height={500} alt="" />
      </AspectRatio>

      <Flex p={6} justifyContent="space-between" alignItems="end">
        <Flex direction="column">
          <Text fontSize="sm" textColor="gray.600">
            {description}
          </Text>
          <Text lineHeight={1} fontWeight="semibold">
            {name.toUpperCase()}
          </Text>
        </Flex>

        <Price fontWeight="semibold" price={price} />
      </Flex>
    </Flex>
  );
};

export default ProductsGalleryCard;

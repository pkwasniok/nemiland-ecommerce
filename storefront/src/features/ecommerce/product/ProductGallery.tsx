import { Flex, AspectRatio, SimpleGrid } from "@chakra-ui/react";

const ProductGallery = () => {
  return (
    <Flex width="100%" direction="column" gap={4}>
      <AspectRatio ratio={1} borderRadius={6} overflow="hidden">
        <Flex bgColor="yellow.100">Image</Flex>
      </AspectRatio>

      <SimpleGrid columns={6} gap={4}>
        <AspectRatio
          width="100%"
          ratio={1}
          border="2px"
          borderColor="green.400"
          borderRadius={6}
          overflow="hidden"
        >
          <Flex bgColor="yellow.100">Image</Flex>
        </AspectRatio>

        <AspectRatio width="100%" ratio={1} borderRadius={6} overflow="hidden">
          <Flex bgColor="yellow.100">Image</Flex>
        </AspectRatio>

        <AspectRatio width="100%" ratio={1} borderRadius={6} overflow="hidden">
          <Flex bgColor="yellow.100">Image</Flex>
        </AspectRatio>

        <AspectRatio width="100%" ratio={1} borderRadius={6} overflow="hidden">
          <Flex bgColor="yellow.100">Image</Flex>
        </AspectRatio>
      </SimpleGrid>
    </Flex>
  );
};

export default ProductGallery;

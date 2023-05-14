import { useState } from "react";
import { Flex, AspectRatio, Grid, IconButton, Box } from "@chakra-ui/react";
import { Image } from "@/features/utils";

import { FiGrid } from "react-icons/fi";

interface ProductGalleryProps {
  images: { src: string }[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | undefined>(0);

  if (selectedImage == undefined) {
    return (
      <AspectRatio width="100%" ratio={1} borderRadius={6} bgColor="white">
        <Box width="100%" height="100%" display="block">
          <Grid
            width="100%"
            height="100%"
            p={6}
            templateColumns="repeat(2, 1fr)"
            templateRows="repeat(2, 1fr)"
            gap={6}
          >
            {images.map((image, index) => (
              <Box
                key={index}
                borderRadius={3}
                bgColor="green.100"
                cursor="pointer"
                onClick={() => setSelectedImage(index)}
              >
                <Image src={image.src} width={2000} height={2000} alt="" />
              </Box>
            ))}
          </Grid>
        </Box>
      </AspectRatio>
    );
  }

  return (
    <Box
      position="relative"
      width="100%"
      overflow="hidden"
      borderRadius={6}
      bgColor="white"
    >
      <AspectRatio width="100%" ratio={1} bgColor="green.100">
        <Image
          src={images[selectedImage].src}
          width={2000}
          height={2000}
          alt=""
        />
      </AspectRatio>

      <Flex
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        p={3}
        justifyContent="end"
      >
        <IconButton
          size="sm"
          variant="ghost"
          colorScheme="blackAlpha"
          icon={<FiGrid size={20} />}
          aria-label=""
          onClick={() => setSelectedImage(undefined)}
        />
      </Flex>
    </Box>
  );
};

export default ProductGallery;

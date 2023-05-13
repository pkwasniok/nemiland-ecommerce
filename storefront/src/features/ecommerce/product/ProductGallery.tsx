import { useState } from "react";
import { Flex, AspectRatio, SimpleGrid } from "@chakra-ui/react";
import { Image } from "@/features/utils";

interface ProductGalleryProps {
  images: { src: string }[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <Flex position="relative" width="100%" direction="column" gap={4}>
      <AspectRatio
        ratio={1}
        borderRadius={12}
        overflow="hidden"
        bgColor="green.100"
      >
        <Image
          src={images[selectedImage].src}
          width={3000}
          height={3000}
          alt=""
        />
      </AspectRatio>

      <Flex
        position="absolute"
        width="100%"
        height="100%"
        overflow="hidden"
        p={5}
        direction="column"
        justifyContent="end"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <SimpleGrid
          width="100%"
          p={3}
          columns={[3, 3, 3, 5]}
          gap={3}
          borderRadius={6}
          bgColor="white"
          transform={show ? "translateY(0)" : "translateY(150%)"}
          transition="all 0.5s"
        >
          {images.map((image, index) => (
            <AspectRatio
              key={index}
              width="100%"
              ratio={1}
              borderRadius={3}
              bgColor="green.100"
              cursor="pointer"
              border="2px"
              borderColor={selectedImage == index ? "green.200" : "transparent"}
              onMouseEnter={() => setSelectedImage(index)}
            >
              <Image src={image.src} width={200} height={200} alt="" />
            </AspectRatio>
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default ProductGallery;

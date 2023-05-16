import NextLink from "next/link";
import { SimpleGrid } from "@chakra-ui/react";
import ProductsGalleryCard from "./ProductsGalleryCard";

interface ProductsGalleryProps {
  products: {
    href: string;
    imageSource: string;
    name: string;
    description: string;
    price: number;
  }[];
}

const ProductsGallery = ({ products }: ProductsGalleryProps) => {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} gap={6}>
      {products.map((product, index) => (
        <NextLink key={index} href={product.href}>
          <ProductsGalleryCard
            imageSource={product.imageSource}
            price={product.price}
            name={product.name}
            description={product.description}
          />
        </NextLink>
      ))}
    </SimpleGrid>
  );
};

export default ProductsGallery;

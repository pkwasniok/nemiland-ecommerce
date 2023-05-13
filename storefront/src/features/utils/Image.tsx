import NextImage from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const Image = ({ src, width, height, alt }: ImageProps) => {
  return (
    <NextImage
      src={`${src}?format=webp&mode=resize&w=${width}&h=${height}`}
      width={width}
      height={height}
      alt={alt}
    />
  );
};

export default Image;

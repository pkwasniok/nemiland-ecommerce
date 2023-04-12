import { Box } from "@chakra-ui/react";
import { useProducts } from "medusa-react";
import { useEffect } from "react";

const HomePage = () => {
  const { products } = useProducts();

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <Box>
      <Box></Box>
    </Box>
  );
};

export default HomePage;

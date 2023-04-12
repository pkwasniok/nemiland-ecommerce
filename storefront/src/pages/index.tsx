import { useProducts } from "medusa-react";
import { useEffect } from "react";

import { PageLayout } from "@/features/layout";

const HomePage = () => {
  const { products } = useProducts();

  useEffect(() => {
    console.log(products);
  }, [products]);

  return <PageLayout></PageLayout>;
};

export default HomePage;

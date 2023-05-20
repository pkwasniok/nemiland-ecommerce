import { useQuery } from "@apollo/client";
import { GQL_QUERY_ACTIVE_ORDER } from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import { Checkout } from "@/features/ecommerce";
import {
  SimpleGrid,
  Flex,
  Heading,
  Button,
  Checkbox,
  Divider,
} from "@chakra-ui/react";
import { FiInfo } from "react-icons/fi";

const CheckoutPage = () => {
  let activeOrder = undefined;

  {
    const { data } = useQuery(GQL_QUERY_ACTIVE_ORDER);
    activeOrder = data?.activeOrder ?? undefined;
  }

  return (
    <PageLayout title="Kasa">
      <SimpleGrid columns={3} gap={6}>
        <Flex
          p={6}
          direction="column"
          gap={6}
          borderRadius={6}
          bgColor="white"
        ></Flex>

        <Flex
          p={6}
          direction="column"
          gap={6}
          borderRadius={6}
          bgColor="white"
        ></Flex>

        <Flex direction="column" gap={6}>
          <Flex
            p={6}
            direction="column"
            gap={6}
            borderRadius={6}
            bgColor="white"
          >
            <Heading size="md" textColor="gray.700">
              Podsumowanie
            </Heading>

            <Flex direction="column" gap={3}>
              {activeOrder?.lines.map((orderLine, index) => (
                <Checkout.OrderLine
                  key={index}
                  imageSource={orderLine.featuredAsset?.source}
                  name={orderLine.productVariant.name}
                  quantity={orderLine.quantity}
                  price={orderLine.linePriceWithTax}
                />
              ))}
            </Flex>

            <Checkout.PriceSummary
              productsPrice={activeOrder?.subTotalWithTax}
              shippingPrice={700}
            />
          </Flex>

          <Flex
            direction="column"
            gap={6}
            p={6}
            borderRadius={6}
            bgColor="white"
          >
            <Flex direction="column" gap={1}>
              <Checkbox size="sm">
                Zapoznałem się i akceptuję regulamin sklepu.
              </Checkbox>
              <Checkbox size="sm">
                Zapoznałem się i akceptuję politykę prywatności sklepu.
              </Checkbox>
            </Flex>

            <Button size="lg" colorScheme="green">
              Kupuję i płacę
            </Button>

            <Flex
              gap={1}
              alignItems="center"
              fontSize="sm"
              textColor="gray.600"
            >
              <FiInfo />
              Przed zakupem zapoznaj się z regulaminem sklepu
            </Flex>
          </Flex>
        </Flex>
      </SimpleGrid>
    </PageLayout>
  );
};

export default CheckoutPage;

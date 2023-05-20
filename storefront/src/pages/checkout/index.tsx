import { PageLayout } from "@/features/layout";
import {
  Grid,
  GridItem,
  Flex,
  Heading,
  Button,
  Text,
  SimpleGrid,
  Checkbox,
} from "@chakra-ui/react";
import { FiInfo } from "react-icons/fi";

import { Checkout } from "@/features/ecommerce";

const CheckoutPage = () => {
  return (
    <PageLayout title="Kasa">
      <Heading size="md">Kasa</Heading>

      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
        ]}
        gap={6}
      >
        <GridItem colSpan={[1, 1, 1, 1, 2]}>
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(1, 1fr)",
              "repeat(1, 1fr)",
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
            ]}
            gap={6}
          >
            <GridItem>
              <Flex
                p={6}
                borderRadius={6}
                bgColor="white"
                direction="column"
                gap={6}
              >
                <Heading size="md" textColor="gray.600">
                  Dostawa
                </Heading>

                <Checkout.ShippingMethodSelectorWidget />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex
                p={6}
                borderRadius={6}
                bgColor="white"
                direction="column"
                gap={6}
              >
                <Heading size="md" textColor="gray.600">
                  Płatność
                </Heading>

                <Checkout.PaymentMethodRadio />
              </Flex>
            </GridItem>
          </Grid>
        </GridItem>

        <GridItem>
          <Flex direction="column" gap={6}>
            <Flex
              p={6}
              borderRadius={6}
              bgColor="white"
              direction="column"
              gap={6}
            >
              <Heading size="md" textColor="gray.600">
                Podsumowanie
              </Heading>

              <Flex direction="column" gap={1}>
                <Checkbox>Akceptuję regulamin sklepu</Checkbox>
                <Checkbox>Akceptuję politykę prywatności sklepu</Checkbox>
              </Flex>

              <Button size="lg" colorScheme="green">
                Kupuję i płacę
              </Button>

              <Flex
                px={1}
                alignItems="center"
                gap={1}
                fontSize={["xs", "sm", "sm", "sm"]}
                textColor="gray.600"
              >
                <FiInfo />
                <Text>Przed zakupem zapoznaj się z regulaminem sklepu</Text>
              </Flex>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </PageLayout>
  );
};

export default CheckoutPage;

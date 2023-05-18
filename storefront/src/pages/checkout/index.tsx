import { PageLayout } from "@/features/layout";
import {
  Grid,
  GridItem,
  Flex,
  Heading,
  Button,
  Text,
  Divider,
  SimpleGrid,
  Checkbox,
} from "@chakra-ui/react";
import { FiInfo } from "react-icons/fi";

import { AddressForm } from "@/features/form";

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

                <SimpleGrid columns={[3, 3, 3, 4]} gap={6}>
                  <Flex
                    border="2px"
                    borderRadius={3}
                    borderColor="green.600"
                    width="100%"
                    height="100px"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                    direction="column"
                    p={3}
                    cursor="pointer"
                  >
                    <img src="/inpost_paczkomat_rectangle.png" />
                  </Flex>
                  <Flex
                    border="1px"
                    borderRadius={3}
                    borderColor="gray.200"
                    width="100%"
                    height="100px"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                    p={3}
                    cursor="pointer"
                  >
                    <img src="/inpost_kurier_rectangle.png" />
                  </Flex>
                  <Flex
                    border="1px"
                    borderRadius={3}
                    borderColor="gray.200"
                    width="100%"
                    height="100px"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                    p={3}
                    cursor="pointer"
                  >
                    <img src="/inpost_paczkomat_rectangle.png" />
                  </Flex>
                </SimpleGrid>

                <Divider />

                <AddressForm
                  initialValues={{
                    city: "",
                    fullName: "",
                    phoneNumber: "",
                    postalCode: "",
                    streetLine1: "",
                    streetLine2: "",
                  }}
                />
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

                <SimpleGrid columns={[3, 3, 3, 4]} gap={6}>
                  <Flex
                    border="2px"
                    borderRadius={3}
                    borderColor="green.600"
                    width="100%"
                    height="100px"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                    direction="column"
                    p={3}
                    cursor="pointer"
                  >
                    <img src="/blik.png" />
                  </Flex>
                  <Flex
                    border="1px"
                    borderRadius={3}
                    borderColor="gray.200"
                    width="100%"
                    height="100px"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                    p={3}
                    cursor="pointer"
                  >
                    <img src="/apple_pay.png" />
                  </Flex>
                  <Flex
                    border="1px"
                    borderRadius={3}
                    borderColor="gray.200"
                    width="100%"
                    height="100px"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                    p={3}
                    cursor="pointer"
                  >
                    <img src="/google_pay.png" />
                  </Flex>

                  <Flex
                    border="1px"
                    borderRadius={3}
                    borderColor="gray.200"
                    width="100%"
                    height="100px"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                    p={3}
                    cursor="pointer"
                  >
                    <img src="/przelewy24.png" />
                  </Flex>
                </SimpleGrid>

                <Checkbox>Akceptuję regulamin usługi Przelewy24</Checkbox>
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

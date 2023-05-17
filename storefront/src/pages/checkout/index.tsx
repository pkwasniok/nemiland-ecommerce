import { PageLayout } from "@/features/layout";
import {
  Grid,
  GridItem,
  Flex,
  RadioGroup,
  Radio,
  VStack,
  Heading,
  Button,
  Text,
  Divider,
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
                alignItems="start"
                gap={6}
              >
                <Heading size="md" textColor="gray.600">
                  Dostawa
                </Heading>

                <RadioGroup>
                  <VStack alignItems="start">
                    <Radio value="A">Paczkomat InPost</Radio>
                    <Radio value="B">Kurier InPost</Radio>
                    <Radio value="C">Odbiór osobisty</Radio>
                  </VStack>
                </RadioGroup>

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
                  onSubmit={(values) => console.log(values)}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex
                p={6}
                borderRadius={6}
                bgColor="white"
                direction="column"
                alignItems="start"
                gap={6}
              >
                <Heading size="md" textColor="gray.600">
                  Płatność
                </Heading>

                <RadioGroup>
                  <VStack alignItems="start">
                    <Radio value="A">Płatność przy odbiorze</Radio>
                    <Radio value="D">BLIK</Radio>
                    <Radio value="B">Google Pay</Radio>
                    <Radio value="C">Apple Pay</Radio>
                  </VStack>
                </RadioGroup>
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

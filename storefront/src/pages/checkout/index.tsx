import { PageLayout } from "@/features/layout";
import { Grid, GridItem, Flex } from "@chakra-ui/react";

const CheckoutPage = () => {
  return (
    <PageLayout title="Kasa">
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
            <GridItem bgColor="red.200">
              <Flex>Shipping</Flex>
            </GridItem>

            <GridItem bgColor="green.200">
              <Flex>Payment</Flex>
            </GridItem>
          </Grid>
        </GridItem>

        <GridItem bgColor="blue.200">
          <Flex>Summary</Flex>
        </GridItem>
      </Grid>
    </PageLayout>
  );
};

export default CheckoutPage;

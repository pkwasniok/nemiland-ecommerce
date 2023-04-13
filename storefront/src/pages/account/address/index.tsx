import NextLink from "next/link";
import { useMeCustomer } from "medusa-react";

import {
  Button,
  Card,
  CardBody,
  Flex,
  Box,
  LinkOverlay,
} from "@chakra-ui/react";
import { PageLayout } from "@/features/layout";

import { FiPlus } from "react-icons/fi";

const AddressPage = () => {
  const { customer, isLoading } = useMeCustomer();

  return (
    <PageLayout
      title="Adresy"
      backlinkHref="/account"
      showTitle
      isLoading={isLoading}
    >
      {customer?.shipping_addresses.map((address, index) => (
        <Card
          key={index}
          variant="outline"
          as={NextLink}
          href={`/account/address/${address.id}`}
        >
          <CardBody>
            <Flex direction="column" fontSize="sm">
              <Box fontWeight="semibold">
                {address.first_name} {address.last_name}
              </Box>

              <Box>{address.address_1}</Box>

              {address.address_2 != "" && <Box>{address.address_2}</Box>}

              <Box>
                {address.postal_code} {address.city}
              </Box>

              <Box>{address.phone}</Box>
            </Flex>
          </CardBody>
        </Card>
      ))}

      <Button
        leftIcon={<FiPlus />}
        as={NextLink}
        href="/account/address/create"
      >
        Nowy adres
      </Button>
    </PageLayout>
  );
};

export default AddressPage;

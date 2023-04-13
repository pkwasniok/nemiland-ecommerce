import NextLink from "next/link";
import { useMeCustomer } from "medusa-react";

import { Button } from "@chakra-ui/react";
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

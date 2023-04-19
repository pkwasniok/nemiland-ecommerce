import NextLink from "next/link";
import { useQuery } from "urql";
import { GQL_QUERY_ACTIVE_CUSTOMER } from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import { Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { FiPackage, FiHome, FiSettings, FiLogOut } from "react-icons/fi";

const AccountPage = () => {
  const [activeCustomerQuery] = useQuery({
    query: GQL_QUERY_ACTIVE_CUSTOMER,
  });
  const activeCustomer = activeCustomerQuery.data?.activeCustomer ?? undefined;

  return (
    <PageLayout
      title="Moje konto"
      showTitle
      isLoading={activeCustomerQuery.fetching}
    >
      <Flex direction="column" alignItems="center" gap={1}>
        <Heading size="sm" textAlign="center">
          Cześć, {activeCustomer?.firstName}!
        </Heading>
        <Text fontSize="sm" textColor="gray.600">
          W czym możemy pomóc?
        </Text>
      </Flex>

      <Button
        justifyContent="start"
        leftIcon={<FiPackage size={18} />}
        as={NextLink}
        href="/account/order"
      >
        Historia zamówień
      </Button>

      <Button
        justifyContent="start"
        leftIcon={<FiHome size={18} />}
        as={NextLink}
        href="/account/address"
      >
        Moje adresy
      </Button>

      <Button
        justifyContent="start"
        leftIcon={<FiSettings size={18} />}
        as={NextLink}
        href="/account/settings"
      >
        Ustawienia konta
      </Button>

      <Spacer />

      <Button
        variant="ghost"
        justifyContent="start"
        leftIcon={<FiLogOut size={18} />}
      >
        Wyloguj się
      </Button>
    </PageLayout>
  );
};

export default AccountPage;

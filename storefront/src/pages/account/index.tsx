import { useRouter } from "next/router";
import NextLink from "next/link";
import { useQuery } from "@apollo/client";
import { GQL_QUERY_ACTIVE_CUSTOMER } from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import { LogoutWidget } from "@/features/account";
import { Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { FiPackage, FiHome, FiSettings } from "react-icons/fi";

const AccountPage = () => {
  const router = useRouter();

  const { data: activeCustomerData, loading } = useQuery(
    GQL_QUERY_ACTIVE_CUSTOMER
  );
  const activeCustomer = activeCustomerData?.activeCustomer ?? undefined;

  return (
    <PageLayout title="Moje konto" showTitle isLoading={loading}>
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

      <LogoutWidget onSuccess={() => router.push("/login")} />
    </PageLayout>
  );
};

export default AccountPage;

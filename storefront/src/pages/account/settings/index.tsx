import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GQL_QUERY_ACTIVE_CUSTOMER } from "@/lib/vendure";

import { AccountLayout } from "@/features/layout";
import { UpdateCustomerWidget, LogoutWidget } from "@/features/account";
import { Flex, Heading } from "@chakra-ui/react";

const SettingsPage = () => {
  const router = useRouter();

  const { data: activeCustomerData } = useQuery(GQL_QUERY_ACTIVE_CUSTOMER);
  const activeCustomer = activeCustomerData?.activeCustomer ?? undefined;

  if (activeCustomer == undefined) {
    return <div></div>;
  }

  return (
    <AccountLayout title="Ustawienia konta">
      <Flex p={6} direction="column" gap={6} borderRadius={6} bgColor="white">
        <Heading size="sm">Moje dane</Heading>
        <UpdateCustomerWidget />
      </Flex>

      <Flex p={6} direction="column" gap={6} borderRadius={6} bgColor="white">
        <Heading size="sm">Zarządzaj kontem</Heading>
        <LogoutWidget onSuccess={() => router.push("/login")} />
      </Flex>
    </AccountLayout>
  );
};

export default SettingsPage;

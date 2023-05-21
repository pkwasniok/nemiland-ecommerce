import { useRouter } from "next/router";

import { useLogout, useActiveCustomer, Account } from "@/features/ecommerce";
import { AccountLayout } from "@/features/layout";
import { Flex, Heading, Button } from "@chakra-ui/react";

import { FiLogOut } from "react-icons/fi";

const SettingsPage = () => {
  const router = useRouter();

  const { activeCustomer } = useActiveCustomer();

  const { logout } = useLogout({
    onSuccess: () => router.push("/login"),
  });

  if (activeCustomer == undefined) {
    return <div></div>;
  }

  return (
    <AccountLayout title="Ustawienia konta">
      <Flex p={6} direction="column" gap={6} borderRadius={6} bgColor="white">
        <Heading size="sm">Moje dane</Heading>
        <Account.UpdateWidget />
      </Flex>

      <Flex p={6} direction="column" gap={6} borderRadius={6} bgColor="white">
        <Heading size="sm">Zarządzaj kontem</Heading>
        <Button leftIcon={<FiLogOut />} onClick={logout}>
          Wyloguj się
        </Button>
      </Flex>
    </AccountLayout>
  );
};

export default SettingsPage;

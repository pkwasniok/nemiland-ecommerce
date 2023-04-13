import { useRouter } from "next/router";
import NextLink from "next/link";
import client from "@/lib/client";
import { useMeCustomer } from "medusa-react";

import {
  useToast,
  Flex,
  Heading,
  Button,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { PageLayout } from "@/features/layout";

import { FiEdit3, FiHome, FiPackage, FiLogOut } from "react-icons/fi";

const AccountPage = () => {
  const router = useRouter();
  const toast = useToast();

  const { customer, isLoading } = useMeCustomer({
    onSettled: (customer) => {
      if (customer == undefined) {
        router.replace("/login");
      }
    },
  });

  const handleLogout = () => {
    client.auth.deleteSession().then(() => {
      toast({
        title: "Wylogowano",
        status: "success",
      });
      router.push("/login");
    });
  };

  return (
    <PageLayout title="Moje konto" showTitle isLoading={isLoading}>
      <Flex direction="column" gap={1}>
        <Heading
          size="sm"
          textAlign="center"
        >{`Cześć, ${customer?.first_name}!`}</Heading>

        <Text fontSize="sm" textAlign="center">
          W czym możemy pomóc?
        </Text>
      </Flex>

      <Button variant="outline" leftIcon={<FiPackage />} justifyContent="start">
        Zamówienia
      </Button>

      <Button
        variant="outline"
        leftIcon={<FiHome />}
        justifyContent="start"
        as={NextLink}
        href="/account/address"
      >
        Adresy
      </Button>

      <Button variant="outline" leftIcon={<FiEdit3 />} justifyContent="start">
        Moje dane
      </Button>

      <Spacer />

      <Button
        variant="ghost"
        leftIcon={<FiLogOut />}
        justifyContent="start"
        onClick={handleLogout}
      >
        Wyloguj się
      </Button>
    </PageLayout>
  );
};

export default AccountPage;

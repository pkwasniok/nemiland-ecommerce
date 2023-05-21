import { ReactNode } from "react";
import NextLink from "next/link";

import { useActiveCustomer } from "@/features/ecommerce";
import { PageLayout } from ".";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";

import { FiHome, FiPackage, FiSettings } from "react-icons/fi";

interface AccountLayoutProps {
  children?: ReactNode;
  title?: string;
}

const AccountLayout = ({ children, title }: AccountLayoutProps) => {
  const { activeCustomer } = useActiveCustomer();

  return (
    <PageLayout title={title} isLoading={activeCustomer == undefined}>
      <Flex direction={["column", "column", "column", "row"]} gap={6}>
        <Flex maxW={["", "", "", "450px"]} w="100%" direction="column" gap={6}>
          <Flex
            p={6}
            direction="column"
            gap={6}
            borderRadius={6}
            bgColor="white"
          >
            <Flex direction="column" gap={1}>
              <Heading size="md">Cześć, {activeCustomer?.firstName}!</Heading>
              <Text fontSize="sm" textColor="gray.600">
                W czym możemy pomóc?
              </Text>
            </Flex>

            <Flex direction="column" gap={3}>
              <Button
                variant="ghost"
                justifyContent="start"
                leftIcon={<FiPackage />}
                as={NextLink}
                href="/account/order"
              >
                Historia zamówień
              </Button>
              <Button
                variant="ghost"
                justifyContent="start"
                leftIcon={<FiHome />}
                as={NextLink}
                href="/account/address"
              >
                Moje adresy
              </Button>
              <Button
                variant="ghost"
                justifyContent="start"
                leftIcon={<FiSettings />}
                as={NextLink}
                href="/account/settings"
              >
                Ustawienia konta
              </Button>
            </Flex>
          </Flex>
        </Flex>

        <Flex flex={1} direction="column" gap={6}>
          {children}
        </Flex>
      </Flex>
    </PageLayout>
  );
};

export default AccountLayout;

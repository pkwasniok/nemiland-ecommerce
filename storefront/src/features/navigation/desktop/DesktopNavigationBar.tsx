import NextLink from "next/link";
import { useQuery } from "@apollo/client";
import { GQL_QUERY_ACTIVE_CUSTOMER } from "@/lib/vendure";

import { Logo } from "@/features/marketing";
import { Flex, IconButton, Button } from "@chakra-ui/react";
import { FiUser, FiShoppingBag } from "react-icons/fi";

import NavigationItem from "./NavigationItems";

interface DesktopNavigationBarProps {
  links?: { label: string; href: string }[];
}

const DesktopNavigationBar = ({ links }: DesktopNavigationBarProps) => {
  const { data: activeCustomerData } = useQuery(GQL_QUERY_ACTIVE_CUSTOMER);
  const activeCustomer = activeCustomerData?.activeCustomer ?? undefined;

  return (
    <Flex
      h={14}
      maxW="1536px"
      w="100%"
      p={4}
      alignItems="center"
      justifyContent="space-between"
      bgColor="whiteAlpha.900"
      backdropFilter="auto"
      backdropBlur="sm"
    >
      <Logo isRedirect />

      <Flex
        position="absolute"
        left="50%"
        transform="auto"
        translateX="-50%"
        gap={4}
      >
        {links?.map((link, index) => (
          <NavigationItem key={index} href={link.href}>
            {link.label}
          </NavigationItem>
        ))}
      </Flex>

      <Flex gap={4}>
        <IconButton
          variant="ghost"
          icon={<FiUser size={20} />}
          aria-label="Account"
          as={NextLink}
          href={activeCustomer == undefined ? "/login" : "/account"}
        />

        <IconButton
          variant="ghost"
          icon={<FiShoppingBag size={20} />}
          aria-label="Cart"
          as={NextLink}
          href="/cart"
        />
      </Flex>
    </Flex>
  );
};

export default DesktopNavigationBar;

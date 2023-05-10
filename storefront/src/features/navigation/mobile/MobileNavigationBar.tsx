import NextLink from "next/link";

import { Logo } from "@/features/marketing";
import { useDisclosure, Flex, IconButton } from "@chakra-ui/react";
import { FiMenu, FiShoppingBag } from "react-icons/fi";

import MobileNavigationDrawer from "./MobileNavigationDrawer";
import NavigationItem from "./NavigationItems";

interface MobileNavigationBarProps {
  links?: { label: string; href: string }[];
}

const MobileNavigationBar = ({ links }: MobileNavigationBarProps) => {
  const drawer = useDisclosure();

  return (
    <>
      <Flex
        h="100%"
        w="100%"
        p={2}
        alignItems="center"
        justifyContent="space-between"
        bgColor="whiteAlpha.900"
        backdropFilter="auto"
        backdropBlur="sm"
      >
        <IconButton
          variant="ghost"
          icon={<FiMenu size={22} />}
          aria-label="Navigation"
          onClick={drawer.onOpen}
        />

        <Logo isRedirect />

        <IconButton
          variant="ghost"
          icon={<FiShoppingBag size={22} />}
          aria-label="Cart"
          as={NextLink}
          href="/cart"
        />
      </Flex>

      <MobileNavigationDrawer isOpen={drawer.isOpen} onClose={drawer.onClose}>
        {links?.map((link, index) => (
          <NavigationItem key={index} href={link.href}>
            {link.label}
          </NavigationItem>
        ))}
      </MobileNavigationDrawer>
    </>
  );
};

export default MobileNavigationBar;

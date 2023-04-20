import { ReactNode } from "react";
import NextLink from "next/link";

import { MobileNavigationDrawer } from "@/features/navigation/mobile";
import { DesktopNavigationBar } from "@/features/navigation/desktop";

import { Logo } from "../marketing";
import {
  useBreakpointValue,
  useDisclosure,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";

import { FiMenu, FiShoppingBag, FiUser } from "react-icons/fi";

interface RootLayoutProps {
  children?: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const drawer = useDisclosure();

  return (
    <>
      <Flex
        direction="column"
        w="100vw"
        h="100vh"
        overflow="auto"
        pt={isMobile ? 12 : 14}
      >
        <Flex
          position="fixed"
          top={0}
          left={0}
          zIndex={10}
          w="100vw"
          justifyContent="center"
          borderBottom="1px"
          borderBottomColor="gray.100"
        >
          {isMobile == true && (
            <Flex
              h={12}
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
          )}

          {isMobile == false && (
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
              <Heading size="lg" as={NextLink} href="/">
                Nemiland
              </Heading>

              <Flex
                position="absolute"
                left="50%"
                transform="auto"
                translateX="-50%"
              >
                <DesktopNavigationBar />
              </Flex>

              <Flex gap={4}>
                <IconButton
                  variant="ghost"
                  icon={<FiUser size={20} />}
                  aria-label="Account"
                  as={NextLink}
                  href="/login"
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
          )}
        </Flex>

        <Flex flex={1} direction="column" alignItems="center">
          {children}
        </Flex>
      </Flex>

      <MobileNavigationDrawer isOpen={drawer.isOpen} onClose={drawer.onClose} />
    </>
  );
};

export default RootLayout;

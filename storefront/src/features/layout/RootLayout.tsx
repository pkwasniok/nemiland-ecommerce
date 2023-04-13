import { ReactNode } from "react";
import NextLink from "next/link";

import {
  useBreakpointValue,
  useDisclosure,
  Flex,
  Box,
  Heading,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
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

              <Heading
                size="lg"
                position="absolute"
                left="50%"
                transform="auto"
                translateX="-50%"
                as={NextLink}
                href="/"
              >
                Nemiland
              </Heading>

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
                <Box />
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

      <Drawer
        placement="left"
        size="lg"
        isOpen={drawer.isOpen}
        onClose={drawer.onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody></DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RootLayout;

import { Logo } from "@/features/marketing";
import NavigationItem from "./NavigationItems";

import {
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  DrawerProps,
} from "@chakra-ui/react";

import { FiUser } from "react-icons/fi";

interface MobileNavigationDrawerProps extends Omit<DrawerProps, "children"> {}

const MobileNavigationDrawer = ({ ...props }: MobileNavigationDrawerProps) => {
  return (
    <Drawer placement="left" size="lg" {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Logo />
        </DrawerHeader>

        <DrawerBody>
          <Flex direction="column" gap={4}>
            <NavigationItem href="/">Strona główna</NavigationItem>
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Flex flex={1} direction="column">
            <NavigationItem href="/login" leftIcon={<FiUser size={20} />}>
              Moje konto
            </NavigationItem>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavigationDrawer;

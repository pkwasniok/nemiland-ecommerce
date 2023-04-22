import { useMutation, useQuery } from "urql";
import { GQL_QUERY_ACTIVE_CUSTOMER } from "@/lib/vendure";

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
  const [{ data }] = useQuery({ query: GQL_QUERY_ACTIVE_CUSTOMER });
  const activeCustomer = data?.activeCustomer ?? undefined;

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
            <NavigationItem
              href={activeCustomer == undefined ? "/login" : "/account"}
              leftIcon={<FiUser size={20} />}
            >
              Moje konto
            </NavigationItem>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavigationDrawer;

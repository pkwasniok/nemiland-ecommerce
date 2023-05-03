import { useQuery } from "@apollo/client";
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

const MobileNavigationDrawer = ({ children, ...props }: DrawerProps) => {
  const { data: activeCustomerData } = useQuery(GQL_QUERY_ACTIVE_CUSTOMER);
  const activeCustomer = activeCustomerData?.activeCustomer ?? undefined;

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
            {children}
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Flex flex={1} direction="column">
            <NavigationItem
              href={activeCustomer == undefined ? "/login" : "/account"}
              leftIcon={<FiUser size={20} />}
            >
              {activeCustomer == undefined
                ? "Moje konto"
                : `${activeCustomer.firstName} ${activeCustomer.lastName}`}
            </NavigationItem>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavigationDrawer;

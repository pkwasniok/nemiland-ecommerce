import { useRouter } from "next/router";

import NavigationItem from "./NavigationItems";
import { Flex } from "@chakra-ui/react";

interface DesktopNavigationBarProps {}

const DesktopNavigationBar = ({}: DesktopNavigationBarProps) => {
  const router = useRouter();

  return (
    <Flex gap={4}>
      <NavigationItem href="/" selected={router.asPath == "/"}>
        Strona główna
      </NavigationItem>
    </Flex>
  );
};

export default DesktopNavigationBar;

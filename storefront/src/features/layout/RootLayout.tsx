import { ReactNode } from "react";

import { MobileNavigationBar } from "@/features/navigation/mobile";
import { DesktopNavigationBar } from "@/features/navigation/desktop";
import { useBreakpointValue, Flex } from "@chakra-ui/react";

interface RootLayoutProps {
  children?: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

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
            <MobileNavigationBar
              links={[{ label: "Strona główna", href: "/" }]}
            />
          )}

          {isMobile == false && (
            <DesktopNavigationBar
              links={[{ label: "Strona główna", href: "/" }]}
            />
          )}
        </Flex>

        <Flex flex={1} direction="column" alignItems="center">
          {children}
        </Flex>
      </Flex>
    </>
  );
};

export default RootLayout;

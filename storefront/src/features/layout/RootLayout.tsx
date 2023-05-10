import { ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { GQL_QUERY_COLLECTIONS } from "@/lib/vendure";

import { MobileNavigationBar } from "@/features/navigation/mobile";
import { DesktopNavigationBar } from "@/features/navigation/desktop";
import { useBreakpointValue, Flex } from "@chakra-ui/react";

interface RootLayoutProps {
  children?: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const { data: collectionsData } = useQuery(GQL_QUERY_COLLECTIONS);
  const collections = collectionsData?.collections.items ?? undefined;

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
              links={collections?.map((collection) => ({
                label: collection.name,
                href: `/collection/${collection.slug}`,
              }))}
            />
          )}

          {isMobile == false && (
            <DesktopNavigationBar
              links={collections?.map((collection) => ({
                label: collection.name,
                href: `/collection/${collection.slug}`,
              }))}
            />
          )}
        </Flex>

        <Flex flex={1} direction="column" alignItems="center" bgColor="gray.50">
          {children}
        </Flex>
      </Flex>
    </>
  );
};

export default RootLayout;

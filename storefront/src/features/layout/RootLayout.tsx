import { ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { GQL_QUERY_COLLECTIONS } from "@/lib/vendure";

import { MobileNavigationBar } from "@/features/navigation/mobile";
import { DesktopNavigationBar } from "@/features/navigation/desktop";
import { useBreakpointValue, Flex, Box } from "@chakra-ui/react";

interface RootLayoutProps {
  children?: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const { data: collectionsData } = useQuery(GQL_QUERY_COLLECTIONS);
  const collections = collectionsData?.collections.items ?? undefined;

  return (
    <Box height="100vh" display="block" pt={12}>
      <Flex
        position="fixed"
        zIndex={50}
        top={0}
        left={0}
        width="100vw"
        height={12}
        justifyContent="center"
        bgColor="white"
      >
        {isMobile == false && (
          <DesktopNavigationBar
            links={collections?.map((collection) => ({
              href: `/collection/${collection.slug}`,
              label: collection.name,
            }))}
          />
        )}

        {isMobile == true && (
          <MobileNavigationBar
            links={collections?.map((collection) => ({
              href: `/collection/${collection.slug}`,
              label: collection.name,
            }))}
          />
        )}
      </Flex>

      <Box height="100%" overflow="hidden" display="block" bgColor="#fbfbfb">
        {children}
      </Box>
    </Box>
  );
};

export default RootLayout;

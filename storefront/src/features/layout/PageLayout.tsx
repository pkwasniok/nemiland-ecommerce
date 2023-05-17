import { ReactNode } from "react";
import Head from "next/head";

import { Flex } from "@chakra-ui/react";

interface PageLayoutProps {
  children?: ReactNode;
  title?: string;
  backlinkHref?: string;
  showTitle?: boolean;
  isLoading?: boolean;
}

const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title == undefined ? "Nemiland" : `${title} | Nemiland`}</title>
      </Head>

      <Flex
        height="100%"
        p={4}
        direction="column"
        alignItems="center"
        overflow="auto"
      >
        <Flex maxWidth="1536px" w="100%" direction="column" gap={6}>
          {children}
        </Flex>
      </Flex>
    </>
  );
};

export default PageLayout;

import { ReactNode } from "react";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

interface PageLayoutProps {
  children?: ReactNode;
  title?: string;
}

const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title != undefined ? `${title} | Nemiland` : "Nemiland"}</title>
      </Head>

      <Flex direction="column">{children}</Flex>
    </>
  );
};

export default PageLayout;

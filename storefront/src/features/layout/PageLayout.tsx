import { ReactNode } from "react";
import Head from "next/head";
import NextLink from "next/link";

import { Flex, Heading } from "@chakra-ui/react";

import { FiChevronLeft } from "react-icons/fi";

interface PageLayoutProps {
  children?: ReactNode;
  title?: string;
  backlinkHref?: string;
  showTitle?: boolean;
}

const PageLayout = ({
  children,
  title,
  backlinkHref,
  showTitle,
}: PageLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title != undefined ? `${title} | Nemiland` : "Nemiland"}</title>
      </Head>

      {showTitle == true && backlinkHref == undefined && (
        <Flex
          w="100%"
          justifyContent="center"
          borderBottom="1px"
          borderBottomColor="gray.100"
          bgColor="gray.50"
          textColor="gray.600"
        >
          <Flex maxW="1536px" w="100%" px={4} py={1}>
            <Heading size="xs" fontWeight="semibold">
              {title}
            </Heading>
          </Flex>
        </Flex>
      )}

      {showTitle == true && backlinkHref != undefined && (
        <Flex
          w="100%"
          justifyContent="center"
          borderBottom="1px"
          borderBottomColor="gray.100"
          bgColor="gray.50"
          textColor="gray.600"
        >
          <Flex
            maxW="1536px"
            w="100%"
            px={3}
            py={1}
            gap={2}
            as={NextLink}
            href={backlinkHref}
          >
            <FiChevronLeft />
            <Heading size="xs" fontWeight="semibold">
              {title}
            </Heading>
          </Flex>
        </Flex>
      )}

      <Flex flex={1} maxW="1536px" w="100%" p={4} direction="column">
        {children}
      </Flex>
    </>
  );
};

export default PageLayout;

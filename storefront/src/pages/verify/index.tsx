import { useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { useVerification, Account } from "@/features/ecommerce";
import { PageLayout } from "@/features/layout";
import { Flex, Heading, Button } from "@chakra-ui/react";

const VerificationPage = () => {
  const router = useRouter();

  const { verify } = useVerification();

  useEffect(() => {
    if (router.isReady && router.query.token != undefined) {
      verify({ token: router.query.token as string });
    }
  }, [router.isReady, router.query, verify]);

  return (
    <PageLayout title="Weryfikacja konta" backlinkHref="/login" showTitle>
      <Flex
        minH="92vh"
        direction="column"
        alignItems="center"
        justifyContent={["", "", "", "center"]}
      >
        <Flex
          maxW={["", "", "", "450px"]}
          w="100%"
          p={6}
          direction="column"
          gap={6}
          borderRadius={6}
          bgColor="white"
        >
          <Heading size="md">Weryfikacja konta</Heading>

          <Account.RequestVerificationWidget
            onSuccess={() => router.push("/login")}
          />

          <Button as={NextLink} href="/login">
            Zaloguj się
          </Button>
        </Flex>
      </Flex>
    </PageLayout>
  );
};

export default VerificationPage;

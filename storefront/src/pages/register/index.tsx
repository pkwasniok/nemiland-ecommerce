import { useRouter } from "next/router";
import NextLink from "next/link";

import { PageLayout } from "@/features/layout";
import { RegisterWidget } from "@/features/account";
import { Flex, Heading, Button } from "@chakra-ui/react";

const RegisterPage = () => {
  const router = useRouter();

  return (
    <PageLayout title="Rejestracja" backlinkHref="/login" showTitle>
      <Flex
        minH="92vh"
        direction={["column", "column", "column", "row"]}
        gap={[6, 6, 6, 0]}
      >
        <Flex
          flex={1}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Flex
            maxW={["", "", "", "450px"]}
            w="100%"
            p={6}
            bgColor="white"
            direction="column"
            gap={6}
          >
            <Heading size="md">Rejestracja</Heading>

            <RegisterWidget onSuccess={() => router.push("/login")} />
          </Flex>
        </Flex>

        <Flex
          flex={1}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Flex
            maxW={["", "", "", "450px"]}
            w="100%"
            p={6}
            bgColor="white"
            direction="column"
            gap={6}
          >
            <Heading size="md">Masz już konto?</Heading>

            <Button as={NextLink} href="/login">
              Zaloguj się
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </PageLayout>
  );
};

export default RegisterPage;

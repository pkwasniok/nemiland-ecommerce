import { useRouter } from "next/router";
import NextLink from "next/link";

import { PageLayout } from "@/features/layout";
import { LoginWidget } from "@/features/account";
import { Flex, Button, Heading } from "@chakra-ui/react";

import { FiMail, FiSearch, FiList, FiEdit3 } from "react-icons/fi";

const LoginPage = () => {
  const router = useRouter();

  return (
    <PageLayout title="Logowanie">
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
            <Heading size="md">Logowanie</Heading>

            <LoginWidget onSuccess={() => router.push("/account")} />

            <Button as={NextLink} href="/password-reset">
              Zresetuj hasło
            </Button>
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
            <Heading size="md">Nie masz jeszcze konta?</Heading>

            <Flex px={3} direction="column" gap={3} textColor="gray.600">
              <Flex gap={3} alignItems="center" fontSize="sm">
                <FiEdit3 size={20} />
                Szybszy proces składania zamówień
              </Flex>

              <Flex gap={3} alignItems="center" fontSize="sm">
                <FiMail size={20} />
                Powiadomienia o nowościach i promocjach
              </Flex>

              <Flex gap={3} alignItems="center" fontSize="sm">
                <FiSearch size={20} />
                Śledzenie statusu zamówienia
              </Flex>

              <Flex gap={3} alignItems="center" fontSize="sm">
                <FiList size={20} />
                Historia zakupów
              </Flex>
            </Flex>

            <Button as={NextLink} href="/register">
              Utwórz konto
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </PageLayout>
  );
};

export default LoginPage;

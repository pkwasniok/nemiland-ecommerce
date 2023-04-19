import { useRouter } from "next/router";
import NextLink from "next/link";

import { PageLayout } from "@/features/layout";
import { LoginWidget } from "@/features/account";
import { Flex, Text, Divider, Button } from "@chakra-ui/react";

const LoginPage = () => {
  const router = useRouter();

  return (
    <PageLayout title="Logowanie" showTitle>
      <LoginWidget
        onSuccess={() => router.push("/account")}
        onError={(e) => (e == "NotVerifiedError" ? router.push("/verify") : {})}
      />

      <Flex alignItems="center" gap={4}>
        <Divider />
        <Text fontSize="sm" textColor="gray.400">
          Lub
        </Text>
        <Divider />
      </Flex>

      <Button variant="ghost" as={NextLink} href="/register">
        Zarejestruj się
      </Button>

      <Button variant="ghost" as={NextLink} href="/password-reset">
        Zresetuj hasło
      </Button>
    </PageLayout>
  );
};

export default LoginPage;

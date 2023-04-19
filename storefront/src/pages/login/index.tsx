import { useRouter } from "next/router";
import NextLink from "next/link";

import { PageLayout } from "@/features/layout";
import { LoginForm, LoginFormValues } from "@/features/form";
import { useToast, Flex, Text, Divider, Button } from "@chakra-ui/react";

const LoginPage = () => {
  const router = useRouter();
  const toast = useToast();

  const handleLogin = (values: LoginFormValues) => {};

  return (
    <PageLayout title="Logowanie" showTitle>
      <LoginForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
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

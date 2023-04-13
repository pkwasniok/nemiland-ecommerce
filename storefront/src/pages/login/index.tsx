import NextLink from "next/link";
import client from "@/lib/client";

import { useToast, Button, Flex, Divider } from "@chakra-ui/react";
import { PageLayout } from "@/features/layout";
import { LoginForm, LoginFormValues } from "@/features/forms";

const LoginPage = () => {
  const toast = useToast();

  const handleLogin = async (values: LoginFormValues) => {
    try {
      await client.auth.authenticate(values);
    } catch (e) {
      toast({
        title: "Coś poszło nie tak...",
        description: "Sprawdź poprawność danych logowania",
        status: "error",
      });
    }
  };

  return (
    <PageLayout title="Logowanie" showTitle>
      <LoginForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
      />

      <Flex
        direction="row"
        alignItems="center"
        gap={2}
        fontSize="sm"
        textColor="gray.500"
      >
        <Divider />
        Lub
        <Divider />
      </Flex>

      <Button as={NextLink} href="/register">
        Zarejestruj się
      </Button>

      <Button as={NextLink} href="/password-reset">
        Zresetuj hasło
      </Button>
    </PageLayout>
  );
};

export default LoginPage;

import NextLink from "next/link";
import client from "@/lib/client";

import { Button, Flex, Divider } from "@chakra-ui/react";
import { PageLayout } from "@/features/layout";
import { LoginForm, LoginFormValues } from "@/features/forms";

const LoginPage = () => {
  const handleLogin = async (values: LoginFormValues) => {
    const r = await client.auth.authenticate(values);
    console.log(r);
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

import { useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import client from "@/lib/client";

import { useToast, Button, Flex, Divider } from "@chakra-ui/react";
import { PageLayout } from "@/features/layout";
import { LoginForm, LoginFormValues } from "@/features/forms";

const LoginPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [isLoading, setLoading] = useState(false);

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);

    try {
      await client.auth.authenticate(values);
      router.push("/account");
    } catch (e) {
      toast({
        title: "Coś poszło nie tak...",
        description: "Sprawdź poprawność danych logowania",
        status: "error",
      });
    }

    setLoading(true);
  };

  return (
    <PageLayout title="Logowanie" showTitle>
      <LoginForm
        initialValues={{ email: "", password: "" }}
        isLoading={isLoading}
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

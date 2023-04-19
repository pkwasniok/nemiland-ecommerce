import { useRouter } from "next/router";
import NextLink from "next/link";
import { useMutation } from "urql";
import { GQL_MUTATION_LOGIN } from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import { LoginForm, LoginFormValues, loginFormSchema } from "@/features/form";
import { useToast, Flex, Text, Divider, Button } from "@chakra-ui/react";

const LoginPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [_, loginMutation] = useMutation(GQL_MUTATION_LOGIN);

  const handleLogin = async (values: LoginFormValues) => {
    const response = await loginMutation(values, {
      requestPolicy: "network-only",
    });

    const result = response.data?.login.__typename;
    if (result == "CurrentUser") {
      toast({
        title: "Zalogowano",
        status: "success",
      });
      router.replace("/account");
    } else if (result == "InvalidCredentialsError") {
      toast({
        title: "Coś poszło nie tak...",
        description: "Sprawdź poprawność danych logowania.",
        status: "warning",
      });
    } else if (result == "NotVerifiedError") {
      toast({
        title: "Coś poszło nie tak...",
        description: "Twoje konto nie zostało zweryfikowane.",
        status: "warning",
      });
    } else {
      toast({
        title: "Coś poszło nie tak...",
        description: "Spróbuj ponownie później.",
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

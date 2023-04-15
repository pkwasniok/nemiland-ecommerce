import { useRouter } from "next/router";
import NextLink from "next/link";
import { useMutation } from "@apollo/client";
import { GQL_MUTATION_LOGIN } from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import { LoginForm, LoginFormValues } from "@/features/form";
import { useToast, Flex, Text, Divider, Button } from "@chakra-ui/react";

const LoginPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [loginMutation] = useMutation(GQL_MUTATION_LOGIN, {
    onCompleted: (data) => {
      const result = data.login.__typename;

      if (result == "CurrentUser") {
        toast({
          title: "Zalogowano",
          status: "success",
        });
        router.push("/account");
      } else if (result == "InvalidCredentialsError") {
        toast({
          title: "Nie udało się zalgować",
          description: "Sprawdź poprawność danych logowania.",
          status: "warning",
        });
      } else if (result == "NotVerifiedError") {
        toast({
          title: "Nie udało się zalgować",
          description: "Twoje konto nie zostało zweryfikowane.",
          status: "warning",
        });
      } else {
        toast({
          title: "Coś poszło nie tak...",
          description: "Sprobój ponownie później.",
          status: "error",
        });
      }
    },
  });

  const handleLogin = (values: LoginFormValues) => {
    loginMutation({ variables: values });
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

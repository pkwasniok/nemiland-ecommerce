import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { GQL_MUTATION_VERIFY } from "@/lib/vendure";
import NextLink from "next/link";

import { PageLayout } from "@/features/layout";
import { RequestVerificationWidget } from "@/features/account";
import { useToast, Flex, Heading, Button } from "@chakra-ui/react";

const VerificationPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [verificationMutation] = useMutation(GQL_MUTATION_VERIFY, {
    onCompleted: (data) => {
      const result = data.verifyCustomerAccount.__typename;
      if (result == "CurrentUser") {
        toast({
          title: "Zweryfikowano",
          description: "Teraz możesz się zalogować.",
          status: "success",
        });
        router.push("/login");
      } else if (
        result == "VerificationTokenExpiredError" ||
        result == "VerificationTokenInvalidError"
      ) {
        toast({
          title: "Link jest nieprawidłowy",
          description: "",
          status: "warning",
        });
      } else {
        toast({
          title: "Wystąpił nieoczekiwany błąd",
          description: "Spróbuj ponownie później.",
          status: "error",
        });
      }
    },
  });

  useEffect(() => {
    if (router.isReady && router.query.token != undefined) {
      verificationMutation({
        variables: { token: router.query.token as string },
      });
    }
  }, [router.isReady, router.query, verificationMutation]);

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

          <RequestVerificationWidget onSuccess={() => router.push("/login")} />

          <Button as={NextLink} href="/login">
            Zaloguj się
          </Button>
        </Flex>
      </Flex>
    </PageLayout>
  );
};

export default VerificationPage;

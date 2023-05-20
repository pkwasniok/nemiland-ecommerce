import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { PageLayout } from "@/features/layout";
import {
  PasswordResetWidget,
  RequestPasswordResetWidget,
} from "@/features/account";
import { Flex, Heading, Button } from "@chakra-ui/react";

const PasswordResetPage = () => {
  const [view, setView] = useState<"RequestPasswordReset" | "PasswordReset">(
    "RequestPasswordReset"
  );

  const router = useRouter();

  useEffect(() => {
    if (router.isReady && router.query.token != undefined) {
      setView("PasswordReset");
    }
  }, [router]);

  return (
    <PageLayout title="Resetowanie hasła" backlinkHref="/login" showTitle>
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
          <Heading size="md">Resetowanie hasła</Heading>

          {view == "RequestPasswordReset" && (
            <>
              <RequestPasswordResetWidget
                onSuccess={() => router.push("/login")}
              />

              <Button as={NextLink} href="/login">
                Zaloguj się
              </Button>
            </>
          )}

          {view == "PasswordReset" && (
            <PasswordResetWidget
              token={router.query.token as string}
              onSuccess={() => router.push("/login")}
              onError={(e) =>
                e == "InvalidTokenError"
                  ? setView("RequestPasswordReset")
                  : router.push("/verify")
              }
            />
          )}
        </Flex>
      </Flex>
    </PageLayout>
  );
};

export default PasswordResetPage;

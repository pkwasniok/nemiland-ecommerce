import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "urql";
import { GQL_MUTATION_VERIFY } from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import { RequestVerificationWidget } from "@/features/account";
import { useToast } from "@chakra-ui/react";

const VerificationPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [, verificationMutation] = useMutation(GQL_MUTATION_VERIFY);

  const handleVerification = async ({ token }: { token: string }) => {
    const response = await verificationMutation({ token });

    const result = response.data?.verifyCustomerAccount.__typename;
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
  };

  useEffect(() => {
    if (router.isReady && router.query.token != undefined) {
      handleVerification({ token: router.query.token as string });
    }
  }, [router]);

  return (
    <PageLayout title="Weryfikacja konta" backlinkHref="/login" showTitle>
      <RequestVerificationWidget onSuccess={() => router.push("/login")} />
    </PageLayout>
  );
};

export default VerificationPage;

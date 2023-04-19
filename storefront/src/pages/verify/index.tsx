import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "urql";
import {
  GQL_MUTATION_REQUEST_VERIFICATION,
  GQL_MUTATION_VERIFY,
} from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import {
  RequestVerificationForm,
  RequestVerificationFormValues,
} from "@/features/form";
import { useToast } from "@chakra-ui/react";

const VerificationPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [, requestVerificationMutation] = useMutation(
    GQL_MUTATION_REQUEST_VERIFICATION
  );

  const [, verifyMutation] = useMutation(GQL_MUTATION_VERIFY);

  useEffect(() => {
    if (router.isReady && router.query.token != undefined) {
      handleVerification({ token: router.query.token as string });
    }
  }, [router]);

  const handleVerification = async ({ token }: { token: string }) => {
    const response = await verifyMutation({ token });

    const result = response.data?.verifyCustomerAccount.__typename;
    if (result == "CurrentUser") {
      toast({
        title: "Zweryfikowano",
        description: "Teraz możesz się zalogować.",
        status: "success",
      });
      router.replace("/login");
    } else if (
      result == "VerificationTokenExpiredError" ||
      result == "VerificationTokenInvalidError"
    ) {
      toast({
        title: "Coś poszło nie tak...",
        description: "Link do weryfikacji konta jest nieprawidłowy.",
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

  const handleRequestVerification = async (
    values: RequestVerificationFormValues
  ) => {
    const response = await requestVerificationMutation(values);

    const result = response.data?.refreshCustomerVerification.__typename;
    if (result == "Success") {
      toast({
        title: "Wysłano",
        description: "Wysłaliśmy Ci linka do weryfikacji konta.",
        status: "success",
      });
      router.replace("/login");
    } else {
      toast({
        title: "Coś poszło nie tak...",
        description: "Spróbuj ponownie później.",
        status: "error",
      });
    }
  };

  return (
    <PageLayout title="Weryfikacja konta" backlinkHref="/login" showTitle>
      <RequestVerificationForm
        initialValues={{ email: "" }}
        onSubmit={handleRequestVerification}
      />
    </PageLayout>
  );
};

export default VerificationPage;

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import {
  GQL_MUTATION_REQUEST_VERIFICATION,
  GQL_MUTATION_VERIFY,
} from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import {
  RequestVerificationForm,
  RequestVerificationFormValues,
} from "@/features/form";
import { useToast } from "@chakra-ui/toast";

const VerificationPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [requestVerificationMutation] = useMutation(
    GQL_MUTATION_REQUEST_VERIFICATION,
    {
      onCompleted: (data) => {
        const result = data.refreshCustomerVerification.__typename;

        if (result == "Success") {
          toast({
            title: "Udało się",
            description:
              "Wysłaliśmy Ci maila z dalszymi instrukcjami do weryfikacji konta.",
            status: "success",
          });
          router.push("/login");
        } else {
          toast({
            title: "Coś poszło nie tak...",
            description: "Spróbuj ponownie później.",
            status: "error",
          });
        }
      },
    }
  );

  const [verifyMutation] = useMutation(GQL_MUTATION_VERIFY, {
    onCompleted: (data) => {
      const result = data.verifyCustomerAccount.__typename;

      if (result == "CurrentUser") {
        // TODO: Success
        toast({
          title: "Zweryfikowano",
          description: "Teraz możesz się zalogować.",
          status: "success",
        });
        router.push("/login");
      } else if (result == "VerificationTokenInvalidError") {
        toast({
          title: "Nie udało się zweryfikować konta",
          description: "Link do weryfikacji konta jest nieprawidłowy.",
          status: "warning",
        });
      } else if (result == "VerificationTokenExpiredError") {
        toast({
          title: "Nie udało się zweryfikować konta",
          description: "Link do weryfikacji stracił ważność.",
          status: "warning",
        });
      } else {
        toast({
          title: "Coś poszło nie tak...",
          description: "Spróbuj ponownie później.",
          status: "error",
        });
      }
    },
  });

  useEffect(() => {
    if (router.isReady && router.query.token != undefined) {
      const token = router.query.token as string;
      verifyMutation({ variables: { token } });
    }
  }, [router]);

  const handleRequestVerification = (values: RequestVerificationFormValues) => {
    requestVerificationMutation({ variables: values });
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

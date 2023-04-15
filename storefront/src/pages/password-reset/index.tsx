import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { GQL_MUTATION_REQUEST_PASSWORD_RESET } from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import {
  RequestPasswordResetForm,
  RequestPasswordResetFormValues,
} from "@/features/form";
import { useToast } from "@chakra-ui/react";

const PasswordResetPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [requestPasswordResetMutation] = useMutation(
    GQL_MUTATION_REQUEST_PASSWORD_RESET,
    {
      onCompleted: (data) => {
        const result = data.requestPasswordReset?.__typename;

        if (result == "Success") {
          toast({
            title: "Udało się",
            description:
              "Wysłaliśmy Ci maila z dalszymi instrukcjami do zresetowania hasła.",
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

  const handleRequestPasswordReset = (
    values: RequestPasswordResetFormValues
  ) => {
    requestPasswordResetMutation({ variables: values });
  };

  return (
    <PageLayout title="Resetowanie hasła" backlinkHref="/login" showTitle>
      <RequestPasswordResetForm
        initialValues={{ email: "" }}
        onSubmit={handleRequestPasswordReset}
      />
    </PageLayout>
  );
};

export default PasswordResetPage;

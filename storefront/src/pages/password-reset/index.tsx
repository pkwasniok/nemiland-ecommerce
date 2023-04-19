import { useRouter } from "next/router";
import { useMutation } from "urql";
import {
  GQL_MUTATION_REQUEST_PASSWORD_RESET,
  GQL_MUTATION_RESET_PASSWORD,
} from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import {
  RequestPasswordResetForm,
  RequestPasswordResetFormValues,
  PasswordResetForm,
  PasswordResetFormValues,
} from "@/features/form";
import { useToast, Heading } from "@chakra-ui/react";

const PasswordResetPage = () => {
  const router = useRouter();

  return (
    <PageLayout title="Resetowanie hasła" backlinkHref="/login" showTitle>
      {router.query.token == undefined && <RequestPasswordResetView />}

      {router.query.token != undefined && (
        <PasswordResetView token={router.query.token as string} />
      )}
    </PageLayout>
  );
};

export default PasswordResetPage;

const RequestPasswordResetView = () => {
  const router = useRouter();
  const toast = useToast();

  const [, requestPasswordResetMutation] = useMutation(
    GQL_MUTATION_REQUEST_PASSWORD_RESET
  );

  const handlePasswordResetRequest = async (
    values: RequestPasswordResetFormValues
  ) => {
    const response = await requestPasswordResetMutation(values);

    const result = response.data?.requestPasswordReset?.__typename;
    if (result == "Success") {
      toast({
        title: "Wysłano",
        description: "Wysłaliśmy Ci linka do zresetowania hasła.",
        status: "success",
      });
      router.push("/login");
    } else {
      toast({
        title: "Coś poszło nie tak...",
        description: "spróbuj ponownie później.",
        status: "error",
      });
    }
  };

  return (
    <RequestPasswordResetForm
      initialValues={{ email: "" }}
      onSubmit={handlePasswordResetRequest}
    />
  );
};

const PasswordResetView = ({ token }: { token: string }) => {
  const router = useRouter();
  const toast = useToast();

  const [, passwordResetMutation] = useMutation(GQL_MUTATION_RESET_PASSWORD);

  const handlePasswordReset = async (values: PasswordResetFormValues) => {
    const response = await passwordResetMutation({ token, ...values });

    const result = response.data?.resetPassword.__typename;
    if (result == "CurrentUser") {
      toast({
        title: "Zresetowano",
        description: "Teraz możesz się zalogować.",
        status: "success",
      });
      router.push("/login");
    } else if (
      result == "PasswordResetTokenExpiredError" ||
      result == "PasswordResetTokenInvalidError"
    ) {
      toast({
        title: "Coś poszło nie tak...",
        description: "Link do zresetowania hasła jest nieprawidłowy.",
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
    <PasswordResetForm
      initialValues={{ newPassword: "" }}
      onSubmit={handlePasswordReset}
    />
  );
};

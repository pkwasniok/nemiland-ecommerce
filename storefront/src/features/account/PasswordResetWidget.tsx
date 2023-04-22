import { useMutation } from "@apollo/client";
import { GQL_MUTATION_RESET_PASSWORD } from "@/lib/vendure";

import { PasswordResetForm, PasswordResetFormValues } from "../form";
import { useToast } from "@chakra-ui/react";

interface PasswordResetWidgetProps {
  token: string;
  onSuccess?: () => void;
  onError?: (error: "InvalidTokenError" | "NotVerifiedError") => void;
}

const PasswordResetWidget = ({
  token,
  onSuccess,
  onError,
}: PasswordResetWidgetProps) => {
  const toast = useToast();

  const [passwordResetMutation] = useMutation(GQL_MUTATION_RESET_PASSWORD, {
    onCompleted: (data) => {
      const result = data.resetPassword.__typename;
      if (result == "CurrentUser") {
        toast({
          title: "Zresetowano hasło",
          status: "success",
        });

        onSuccess?.();
      } else if (
        result == "PasswordResetTokenExpiredError" ||
        result == "PasswordResetTokenInvalidError"
      ) {
        toast({
          title: "Link do resetowania hasła jest nierpawidłowy",
          status: "warning",
        });

        onError?.("InvalidTokenError");
      } else if (result == "NotVerifiedError") {
        toast({
          title: "Konto nie zostało zweryfikowane",
          status: "warning",
        });

        onError?.("NotVerifiedError");
      } else {
        toast({
          title: "Wystąpił nieoczekiwany błąd",
          description: "Spróbuj ponownie później",
          status: "error",
        });
      }
    },
  });

  const handlePasswordReset = async (values: PasswordResetFormValues) => {
    passwordResetMutation({ variables: { token, ...values } });
  };

  return (
    <PasswordResetForm
      initialValues={{ newPassword: "" }}
      onSubmit={handlePasswordReset}
    />
  );
};

export default PasswordResetWidget;

import { useMutation } from "urql";
import { GQL_MUTATION_REQUEST_PASSWORD_RESET } from "@/lib/vendure";

import {
  RequestPasswordResetForm,
  RequestPasswordResetFormValues,
} from "@/features/form";
import { useToast } from "@chakra-ui/react";

interface RequestPasswordResetWidgetProps {
  onSuccess?: () => void;
}

const RequestPasswordResetWidget = ({
  onSuccess,
}: RequestPasswordResetWidgetProps) => {
  const toast = useToast();

  const [, requestPasswordResetMutation] = useMutation(
    GQL_MUTATION_REQUEST_PASSWORD_RESET
  );

  const handleRequestPasswordReset = async (
    values: RequestPasswordResetFormValues
  ) => {
    const response = await requestPasswordResetMutation(values);

    const result = response.data?.requestPasswordReset?.__typename;
    if (result == "Success") {
      toast({
        title: "Wysłaliśmy Ci wiadomość",
        status: "success",
      });

      onSuccess?.();
    } else {
      toast({
        title: "Coś poszło nie tak...",
        description: "Spróbuj ponownie później.",
        status: "error",
      });
    }
  };

  return (
    <RequestPasswordResetForm
      initialValues={{ email: "" }}
      onSubmit={handleRequestPasswordReset}
    />
  );
};

export default RequestPasswordResetWidget;

import { useMutation } from "urql";
import { GQL_MUTATION_REQUEST_VERIFICATION } from "@/lib/vendure";

import {
  RequestVerificationForm,
  RequestVerificationFormValues,
} from "@/features/form";
import { useToast } from "@chakra-ui/react";

interface RequestVerificationWidgetProps {
  onSuccess?: () => void;
}

const RequestVerificationWidget = ({
  onSuccess,
}: RequestVerificationWidgetProps) => {
  const toast = useToast();

  const [, requestVerificationMutation] = useMutation(
    GQL_MUTATION_REQUEST_VERIFICATION
  );

  const handleRequestVerification = async (
    values: RequestVerificationFormValues
  ) => {
    const response = await requestVerificationMutation(values);

    const result = response.data?.refreshCustomerVerification.__typename;
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
    <RequestVerificationForm
      initialValues={{ email: "" }}
      onSubmit={handleRequestVerification}
    />
  );
};

export default RequestVerificationWidget;

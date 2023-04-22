import { useMutation } from "@apollo/client";
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

  const [requestVerificationMutation] = useMutation(
    GQL_MUTATION_REQUEST_VERIFICATION,
    {
      onCompleted: (data) => {
        const result = data.refreshCustomerVerification.__typename;
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
      },
    }
  );

  const handleRequestVerification = async (
    values: RequestVerificationFormValues
  ) => {
    requestVerificationMutation({ variables: values });
  };

  return (
    <RequestVerificationForm
      initialValues={{ email: "" }}
      onSubmit={handleRequestVerification}
    />
  );
};

export default RequestVerificationWidget;

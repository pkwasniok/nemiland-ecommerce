import { useMutation, useQuery } from "urql";
import {
  GQL_MUTATION_UPDATE_CUSTOMER,
  GQL_QUERY_ACTIVE_CUSTOMER,
} from "@/lib/vendure";

import { UpdateCustomerForm, UpdateCustomerFormValues } from "@/features/form";
import { useToast } from "@chakra-ui/react";

interface UpdateCustomerWidgetProps {
  onSuccess?: () => void;
}

const UpdateCustomerWidget = ({ onSuccess }: UpdateCustomerWidgetProps) => {
  const toast = useToast();

  const [{ data }] = useQuery({ query: GQL_QUERY_ACTIVE_CUSTOMER });
  const activeCustomer = data?.activeCustomer ?? undefined;

  const [, updateCustomerMutation] = useMutation(GQL_MUTATION_UPDATE_CUSTOMER);

  const handleUpdateCustomer = async (values: UpdateCustomerFormValues) => {
    const response = await updateCustomerMutation(values);

    const result = response.data?.updateCustomer.__typename;
    if (result == "Customer") {
      toast({
        title: "Zapisano",
        status: "success",
      });
    } else {
      toast({
        title: "Wystąpił nieoczekiwany błąd",
        description: "Spróbuj ponownie później.",
        status: "error",
      });
    }
  };

  if (activeCustomer == undefined) {
    return <div></div>;
  }

  return (
    <UpdateCustomerForm
      initialValues={activeCustomer}
      onSubmit={handleUpdateCustomer}
    />
  );
};

export default UpdateCustomerWidget;

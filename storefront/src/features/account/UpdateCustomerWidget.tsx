import { useMutation, useQuery } from "@apollo/client";
import {
  GQL_MUTATION_UPDATE_CUSTOMER,
  GQL_QUERY_ACTIVE_CUSTOMER,
} from "@/lib/vendure";

import { UpdateCustomerForm, UpdateCustomerFormValues } from "@/features/form";
import { useToast } from "@chakra-ui/react";

const UpdateCustomerWidget = () => {
  const toast = useToast();

  const { data: activeCustomerData } = useQuery(GQL_QUERY_ACTIVE_CUSTOMER);
  const activeCustomer = activeCustomerData?.activeCustomer ?? undefined;

  const [updateCustomerMutation] = useMutation(GQL_MUTATION_UPDATE_CUSTOMER, {
    refetchQueries: [GQL_QUERY_ACTIVE_CUSTOMER],
    onCompleted: (data) => {
      const result = data.updateCustomer.__typename;
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
    },
  });

  const handleUpdateCustomer = async (values: UpdateCustomerFormValues) => {
    updateCustomerMutation({ variables: values });
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

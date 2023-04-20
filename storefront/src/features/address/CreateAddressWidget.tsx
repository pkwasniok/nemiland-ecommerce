import { useMutation } from "urql";
import { GQL_MUTATION_CREATE_ADDRESS } from "@/lib/vendure";

import { AddressForm, AddressFormValues } from "@/features/form";
import { useToast } from "@chakra-ui/react";

interface CreateAddressWidgetProps {
  onSuccess?: () => void;
}

const CreateAddressWidget = ({ onSuccess }: CreateAddressWidgetProps) => {
  const toast = useToast();

  const [, createAddressMutation] = useMutation(GQL_MUTATION_CREATE_ADDRESS);

  const handleCreateAddress = async (values: AddressFormValues) => {
    const response = await createAddressMutation(values);
    console.log(response);

    const result = response.data?.createCustomerAddress.__typename;
    if (result == "Address") {
      toast({
        title: "Zapisano nowy adres",
        status: "success",
      });

      onSuccess?.();
    } else {
      toast({
        title: "Wystąpił nieoczekiwany błąd",
        description: "Spróbuj ponownie później.",
        status: "error",
      });
    }
  };

  return (
    <AddressForm
      initialValues={{
        fullName: "",
        streetLine1: "",
        streetLine2: "",
        postalCode: "",
        city: "",
        phoneNumber: "",
      }}
      onSubmit={handleCreateAddress}
    />
  );
};

export default CreateAddressWidget;

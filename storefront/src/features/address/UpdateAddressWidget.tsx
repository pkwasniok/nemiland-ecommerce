import { useMutation, useQuery } from "urql";
import {
  GQL_MUTATION_UPDATE_ADDRESS,
  GQL_QUERY_ADDRESSES,
} from "@/lib/vendure";

import { AddressForm, AddressFormValues } from "@/features/form";
import { useToast } from "@chakra-ui/react";

interface UpdateAddressWidgetProps {
  addressId: string;
  onSuccess?: () => void;
}

const UpdateAddressWidget = ({
  addressId,
  onSuccess,
}: UpdateAddressWidgetProps) => {
  const toast = useToast();

  const [{ data }] = useQuery({ query: GQL_QUERY_ADDRESSES });
  const addresses = data?.activeCustomer?.addresses ?? undefined;
  const address = addresses?.find((address) => address.id == addressId);

  const [, updateAddressMutation] = useMutation(GQL_MUTATION_UPDATE_ADDRESS);

  const handleUpdateAddress = async (values: AddressFormValues) => {
    const response = await updateAddressMutation({ id: addressId, ...values });

    const result = response.data?.updateCustomerAddress.__typename;
    if (result == "Address") {
      toast({
        title: "Zapisano",
        status: "success",
      });
    } else {
      toast({
        title: "Wystąpił nieoczekiwany błąd",
        description: "Spróbuj ponownie później",
        status: "error",
      });
    }
  };

  if (address == undefined) {
    return <div />;
  }

  return (
    <AddressForm
      initialValues={{
        fullName: address.fullName!,
        phoneNumber: address.phoneNumber!,
        streetLine1: address.streetLine1,
        streetLine2: address.streetLine2!,
        postalCode: address.postalCode!,
        city: address.city!,
      }}
      onSubmit={handleUpdateAddress}
    />
  );
};

export default UpdateAddressWidget;

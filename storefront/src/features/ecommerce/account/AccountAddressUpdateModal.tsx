import { useQuery, useMutation } from "@apollo/client";
import {
  GQL_MUTATION_UPDATE_ADDRESS,
  GQL_QUERY_ADDRESSES,
} from "@/lib/vendure";

import { AddressForm, AddressFormValues } from "./forms/AddressForm";
import {
  useToast,
  Modal,
  ModalProps,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";

interface AccountAddressUpdateModalProps extends Omit<ModalProps, "children"> {
  addressId: string;
  onSuccess?: () => void;
}

const AccountAddressUpdateModal = ({
  addressId,
  ...props
}: AccountAddressUpdateModalProps) => {
  const toast = useToast();

  let address = undefined;

  {
    const { data } = useQuery(GQL_QUERY_ADDRESSES);
    address = data?.activeCustomer?.addresses?.filter(
      (address) => address.id == addressId
    )[0];
  }

  const [createAddressMutation] = useMutation(GQL_MUTATION_UPDATE_ADDRESS, {
    refetchQueries: [GQL_QUERY_ADDRESSES],
    onCompleted: (data) => {
      const result = data.updateCustomerAddress.__typename;

      if (result == "Address") {
        toast({
          title: "Zaktualizowano adres",
          status: "success",
        });
        props.onClose();
      }
    },
  });

  const handleSubmit = (values: AddressFormValues) => {
    createAddressMutation({ variables: { id: addressId, ...values } });
  };

  return (
    <Modal size="lg" {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodaj nowy adres</ModalHeader>
        <ModalBody>
          <AddressForm
            initialValues={{
              city: address?.city ?? "",
              fullName: address?.fullName ?? "",
              phoneNumber: address?.phoneNumber ?? "",
              postalCode: address?.postalCode ?? "",
              streetLine1: address?.streetLine1 ?? "",
              streetLine2: address?.streetLine2 ?? "",
            }}
            onSubmit={handleSubmit}
          />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AccountAddressUpdateModal;

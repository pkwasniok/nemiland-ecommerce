import { useMutation } from "@apollo/client";
import {
  GQL_MUTATION_CREATE_ADDRESS,
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

interface AccountAddressCreateModalProps extends Omit<ModalProps, "children"> {
  onSuccess?: () => void;
}

const AccountAddressCreateModal = ({
  ...props
}: AccountAddressCreateModalProps) => {
  const toast = useToast();

  const [createAddressMutation] = useMutation(GQL_MUTATION_CREATE_ADDRESS, {
    refetchQueries: [GQL_QUERY_ADDRESSES],
    onCompleted: (data) => {
      const result = data.createCustomerAddress.__typename;

      if (result == "Address") {
        toast({
          title: "Utworzono nowy adres",
          status: "success",
        });
        props.onClose();
      }
    },
  });

  const handleSubmit = (values: AddressFormValues) => {
    createAddressMutation({ variables: values });
  };

  return (
    <Modal size="lg" {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodaj nowy adres</ModalHeader>
        <ModalBody>
          <AddressForm
            initialValues={{
              city: "",
              fullName: "",
              phoneNumber: "",
              postalCode: "",
              streetLine1: "",
              streetLine2: "",
            }}
            onSubmit={handleSubmit}
          />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AccountAddressCreateModal;

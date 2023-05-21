import { useActiveCustomer } from "@/features/ecommerce";
import { AddressForm, AddressFormValues } from "./forms/AddressForm";
import {
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
  const { createAddress } = useActiveCustomer();

  const handleSubmit = (values: AddressFormValues) => {
    createAddress(values);
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

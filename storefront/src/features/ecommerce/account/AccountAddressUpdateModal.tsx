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

interface AccountAddressUpdateModalProps extends Omit<ModalProps, "children"> {
  addressId: string;
  onSuccess?: () => void;
}

const AccountAddressUpdateModal = ({
  addressId,
  ...props
}: AccountAddressUpdateModalProps) => {
  const { activeCustomer, updateAddress } = useActiveCustomer();
  const address =
    activeCustomer?.addresses?.filter(
      (address) => address.id == addressId
    )[0] ?? undefined;

  const handleSubmit = (values: AddressFormValues) => {
    updateAddress({ id: addressId, ...values });
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

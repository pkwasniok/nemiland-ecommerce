import { useState } from "react";
import { useQuery, useMutation } from "urql";
import {
  GQL_MUTATION_DELETE_ADDRESS,
  GQL_QUERY_ADDRESSES,
} from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import { CreateAddressWidget, UpdateAddressWidget } from "@/features/address";
import {
  useToast,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Card,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import { FiPlus, FiTrash } from "react-icons/fi";

const AddressesPage = () => {
  const toast = useToast();

  const [selectedAddress, setAddress] = useState<undefined | string>(undefined);
  const createAddressModal = useDisclosure();

  const [{ data, fetching }, refetchAddresses] = useQuery({
    query: GQL_QUERY_ADDRESSES,
  });
  const addresses = data?.activeCustomer?.addresses ?? undefined;

  const [, deleteAddressMutation] = useMutation(GQL_MUTATION_DELETE_ADDRESS);

  const handleDeleteAddress = async (addressId: string) => {
    const response = await deleteAddressMutation({ id: addressId });

    const result = response.data?.deleteCustomerAddress.success;
    if (result) {
      toast({
        title: "Usunięto adres",
        status: "success",
      });

      setAddress(undefined);
      refetchAddresses({ requestPolicy: "network-only" });
    } else {
      toast({
        title: "Wystąpił nieoczekiwany błąd",
        description: "Spróbuj ponownie później.",
        status: "error",
      });
    }
  };

  return (
    <>
      <PageLayout
        title="Moje adresy"
        backlinkHref="/account"
        isLoading={fetching}
        showTitle
      >
        {addresses?.map((address, index) => (
          <Card
            key={index}
            variant="outline"
            p={4}
            onClick={() => setAddress(address.id)}
          >
            <Flex direction="column" gap={1}>
              <Heading size="sm">{address.fullName}</Heading>

              <Text size="sm">{address.phoneNumber}</Text>
              <Text size="sm">
                {address.postalCode} {address.city}
              </Text>
              <Text size="sm">{address.streetLine1}</Text>
            </Flex>
          </Card>
        ))}

        <Button leftIcon={<FiPlus />} onClick={createAddressModal.onOpen}>
          Dodaj nowy adres
        </Button>
      </PageLayout>

      <Modal
        isOpen={createAddressModal.isOpen}
        onClose={createAddressModal.onClose}
        size="sm"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dodaj nowy adres</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateAddressWidget onSuccess={createAddressModal.onClose} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={selectedAddress != undefined}
        onClose={() => setAddress(undefined)}
        size="sm"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edytuj adres</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={2}>
              <UpdateAddressWidget addressId={selectedAddress!} />
              <Button
                variant="ghost"
                colorScheme="red"
                leftIcon={<FiTrash />}
                onClick={() => handleDeleteAddress(selectedAddress!)}
              >
                Usuń adres
              </Button>
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddressesPage;

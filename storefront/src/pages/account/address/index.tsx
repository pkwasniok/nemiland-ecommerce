import { useQuery } from "urql";
import { GQL_QUERY_ADDRESSES } from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import { CreateAddressWidget } from "@/features/address";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

const AddressesPage = () => {
  const createAddressModal = useDisclosure();

  const [{ data, fetching }] = useQuery({ query: GQL_QUERY_ADDRESSES });

  return (
    <>
      <PageLayout
        title="Moje adresy"
        backlinkHref="/account"
        isLoading={fetching}
        showTitle
      >
        {data?.activeCustomer?.addresses?.length}

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
    </>
  );
};

export default AddressesPage;

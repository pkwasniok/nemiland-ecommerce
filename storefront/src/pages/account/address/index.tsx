import { useActiveCustomer, Account } from "@/features/ecommerce";
import { AccountLayout } from "@/features/layout";
import { useDisclosure, Button, Flex, SimpleGrid } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

const AddressesPage = () => {
  const addressCreateModal = useDisclosure();

  const { activeCustomer, deleteAddress } = useActiveCustomer();

  return (
    <>
      <AccountLayout title="Moje adresy">
        <Flex direction="column" gap={6}>
          <SimpleGrid columns={[1, 1, 1, 1, 2]} gap={6}>
            {activeCustomer?.addresses?.map((address, index) => (
              <Account.AddressCard
                key={index}
                fullName={address.fullName}
                phoneNumber={address.phoneNumber}
                streetLine1={address.streetLine1}
                streetLine2={address.streetLine2}
                postalCode={address.postalCode}
                city={address.city}
                onDeleteClick={() => deleteAddress({ id: address.id })}
              />
            ))}

            <Flex direction="column">
              <Flex
                p={6}
                direction="column"
                gap={6}
                borderRadius={6}
                bgColor="white"
              >
                <Button
                  leftIcon={<FiPlus />}
                  onClick={addressCreateModal.onOpen}
                >
                  Dodaj nowy adres
                </Button>
              </Flex>
            </Flex>
          </SimpleGrid>
        </Flex>
      </AccountLayout>

      <Account.AddressCreateModal
        isOpen={addressCreateModal.isOpen}
        onClose={addressCreateModal.onClose}
      />
    </>
  );
};

export default AddressesPage;

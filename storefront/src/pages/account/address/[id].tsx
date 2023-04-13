import { useState } from "react";
import { useRouter } from "next/router";
import client from "@/lib/client";
import { useMeCustomer } from "medusa-react";

import { Button, useToast } from "@chakra-ui/react";
import { PageLayout } from "@/features/layout";
import { AddressForm, AddressFormValues } from "@/features/forms";

import { FiTrash } from "react-icons/fi";

const EditAddressPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [isFormLoading, setLoading] = useState(false);
  const [address, setAddress] = useState<
    (AddressFormValues & { id: string }) | undefined
  >(undefined);

  const { isLoading } = useMeCustomer({
    onSuccess: (data) => {
      const selectedAddress = data.customer.shipping_addresses.find(
        (address) => address.id == router.query.id
      );

      if (selectedAddress != undefined) {
        setAddress({
          id: selectedAddress.id,
          firstName: selectedAddress.first_name ?? "",
          lastName: selectedAddress.last_name ?? "",
          address1: selectedAddress.address_1 ?? "",
          address2: selectedAddress.address_2 ?? "",
          postalCode: selectedAddress.postal_code ?? "",
          city: selectedAddress.city ?? "",
          phone: selectedAddress.phone ?? "",
          contryCode: selectedAddress.country_code ?? "",
          company: selectedAddress.company ?? "",
          province: selectedAddress.province ?? "",
        });
      }
    },
  });

  const handleAddressEdit = async (values: AddressFormValues) => {
    setLoading(true);

    if (address != undefined) {
      try {
        await client.customers.addresses.updateAddress(address.id, {
          country_code: values.contryCode,
          first_name: values.firstName,
          last_name: values.lastName,
          address_1: values.address1,
          address_2: values.address2,
          postal_code: values.postalCode,
          city: values.city,
          province: values.province,
          phone: values.phone,
          company: values.company,
          metadata: {},
        });

        toast({
          title: "Zapisano",
          status: "success",
        });
      } catch (e) {
        toast({
          title: "Coś poszło nie tak...",
          description: "Spróbuj ponownie później",
          status: "error",
        });
      }
    }

    setLoading(false);
  };

  const handleAddressDelete = async () => {
    if (address != undefined) {
      try {
        await client.customers.addresses.deleteAddress(address.id);

        toast({
          title: "Usunięto",
          status: "success",
        });

        router.push("/account/address");
      } catch (e) {
        toast({
          title: "Coś poszło nie tak...",
          description: "Spróbuj ponownie później",
          status: "error",
        });
      }
    }
  };

  return (
    <PageLayout
      title="Edycja adresu"
      backlinkHref="/account/address"
      showTitle
      isLoading={isLoading || address == undefined}
    >
      {address != undefined && (
        <AddressForm
          initialValues={address}
          isLoading={isFormLoading}
          onSubmit={handleAddressEdit}
        />
      )}

      <Button
        colorScheme="red"
        variant="ghost"
        leftIcon={<FiTrash />}
        onClick={handleAddressDelete}
      >
        Usuń adres
      </Button>
    </PageLayout>
  );
};

export default EditAddressPage;

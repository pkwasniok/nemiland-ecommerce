import { useState } from "react";
import { useRouter } from "next/router";
import client from "@/lib/client";

import { useToast } from "@chakra-ui/react";
import { PageLayout } from "@/features/layout";
import { AddressForm, AddressFormValues } from "@/features/forms";

const CreateAddressPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [isLoading, setLoading] = useState(false);

  const handleAddressCreate = async (values: AddressFormValues) => {
    setLoading(true);

    try {
      const res = await client.customers.addresses.addAddress({
        address: {
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
        },
      });

      toast({
        title: "Zapisano",
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

    setLoading(false);
  };

  return (
    <PageLayout title="Nowy adres" backlinkHref="/account/address" showTitle>
      <AddressForm
        initialValues={{
          firstName: "",
          lastName: "",
          address1: "",
          address2: "",
          city: "",
          postalCode: "",
          province: "",
          phone: "",
          company: "",
          contryCode: "PL",
        }}
        isLoading={isLoading}
        onSubmit={handleAddressCreate}
      />
    </PageLayout>
  );
};

export default CreateAddressPage;

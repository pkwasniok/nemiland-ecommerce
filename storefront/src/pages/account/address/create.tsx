import { PageLayout } from "@/features/layout";
import { AddressForm, AddressFormValues } from "@/features/forms";

const CreateAddressPage = () => {
  const handleAddressCreate = (values: AddressFormValues) => {
    console.log(values);
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
        }}
        onSubmit={handleAddressCreate}
      />
    </PageLayout>
  );
};

export default CreateAddressPage;

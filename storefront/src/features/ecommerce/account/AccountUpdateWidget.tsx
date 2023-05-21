import { useActiveCustomer } from "@/features/ecommerce";
import {
  CustomerUpdateForm,
  CustomerUpdateFormValues,
} from "./forms/CustomerUpdateForm";

const AccountUpdateWidget = () => {
  const { activeCustomer, updateActiveCustomer } = useActiveCustomer();

  const handleSubmit = async (values: CustomerUpdateFormValues) => {
    updateActiveCustomer(values);
  };

  if (activeCustomer == undefined) {
    return <div></div>;
  }

  return (
    <CustomerUpdateForm
      initialValues={activeCustomer}
      onSubmit={handleSubmit}
    />
  );
};

export default AccountUpdateWidget;

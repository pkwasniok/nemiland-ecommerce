import { useCustomer } from "@/features/ecommerce";
import { RegisterForm, RegisterFormValues } from "./forms/RegisterForm";

const AccountRegisterWidget = () => {
  const { register } = useCustomer({});

  const handleSubmit = async (values: RegisterFormValues) => {
    register(values);
  };

  return (
    <RegisterForm
      initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
      onSubmit={handleSubmit}
    />
  );
};

export default AccountRegisterWidget;

import { useRouter } from "next/router";
import { useCustomer } from "@/features/ecommerce";
import { LoginForm, LoginFormValues } from "./forms/LoginForm";

const AccountLoginWidget = () => {
  const router = useRouter();

  const { login } = useCustomer({
    onLogin: () => {
      router.push("/account");
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    login(values);
  };

  return (
    <LoginForm
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
    />
  );
};

export default AccountLoginWidget;

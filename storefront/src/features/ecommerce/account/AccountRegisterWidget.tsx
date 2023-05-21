import { useRegister } from "@/features/ecommerce";
import { RegisterForm, RegisterFormValues } from "./forms/RegisterForm";
import { useToast } from "@chakra-ui/react";

interface AccountRegisterWidgetProps {
  onSuccess?: () => void;
}

const AccountRegisterWidget = ({ onSuccess }: AccountRegisterWidgetProps) => {
  const toast = useToast();

  const { register } = useRegister({
    onSuccess: () => {
      onSuccess?.();
      toast({
        title: "Zarejestrowano konto",
        description: "Wysłaliśmy Ci linka do weryfikacji konta.",
        status: "success",
      });
    },
    onError: () => {
      toast({
        title: "Wystąpił nieoczekiwany błąd",
        status: "error",
      });
    },
  });

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

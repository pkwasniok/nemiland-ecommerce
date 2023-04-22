import { useMutation } from "@apollo/client";
import { GQL_MUTATION_REGISTER } from "@/lib/vendure";

import { RegisterForm, RegisterFormValues } from "@/features/form";
import { useToast } from "@chakra-ui/react";

interface RegisterWidgetProps {
  onSuccess?: () => void;
}

const RegisterWidget = ({ onSuccess }: RegisterWidgetProps) => {
  const toast = useToast();

  const [registerMutation] = useMutation(GQL_MUTATION_REGISTER, {
    onCompleted: (data) => {
      const result = data.registerCustomerAccount.__typename;
      if (result == "Success") {
        toast({
          title: "Zarejestrowano konto",
          description: "Wysłaliśmy Ci linka do weryfikacji konta.",
          status: "success",
        });

        onSuccess?.();
      } else {
        toast({
          title: "Wystąpił nieoczekiwany błąd",
          status: "error",
        });
      }
    },
  });

  const handleRegister = async (values: RegisterFormValues) => {
    registerMutation({ variables: values });
  };

  return (
    <RegisterForm
      initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
      onSubmit={handleRegister}
    />
  );
};

export default RegisterWidget;

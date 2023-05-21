import { useLogin } from "@/features/ecommerce";
import { LoginForm, LoginFormValues } from "./forms/LoginForm";
import { useToast } from "@chakra-ui/react";

interface AccountLoginWidgetProps {
  onSuccess?: () => void;
  onError?: () => void;
}

const AccountLoginWidget = ({
  onSuccess,
  onError,
}: AccountLoginWidgetProps) => {
  const toast = useToast();

  const { login } = useLogin({
    onSuccess: () => {
      onSuccess?.();
      toast({
        title: "Zalogowano",
        status: "success",
      });
    },
    onError: (error) => {
      onError?.();
      if (error == "InvalidCredentialsError") {
        toast({
          title: "Błędne dane logowania",
          status: "warning",
        });
      } else if (error == "NotVerifiedError") {
        toast({
          title: "Konto nie zostało zweryfikowane",
          status: "warning",
        });
      } else {
        toast({
          title: "Wystąpił nieoczekiwany błąd",
          description: "Spróbuj ponownie później.",
          status: "error",
        });
      }
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

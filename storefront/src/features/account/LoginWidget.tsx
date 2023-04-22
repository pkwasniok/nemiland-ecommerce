import { useEffect } from "react";
import { useMutation, useQuery } from "urql";
import { GQL_MUTATION_LOGIN, GQL_QUERY_ACTIVE_CUSTOMER } from "@/lib/vendure";

import { LoginForm, LoginFormValues } from "@/features/form";
import { useToast } from "@chakra-ui/react";

interface LoginWidgetProps {
  onSuccess?: () => void;
  onError?: (error: "NotVerifiedError") => void;
}

const LoginWidget = ({ onSuccess, onError }: LoginWidgetProps) => {
  const toast = useToast();

  const [activeCustomerQuery, refetchActiveCustomer] = useQuery({
    query: GQL_QUERY_ACTIVE_CUSTOMER,
    requestPolicy: "network-only",
  });
  const [, loginMutation] = useMutation(GQL_MUTATION_LOGIN);

  const activeCustomer = activeCustomerQuery.data?.activeCustomer ?? undefined;

  useEffect(() => {
    if (activeCustomer != undefined) {
      onSuccess?.();
    }
  });

  const handleLogin = async (values: LoginFormValues) => {
    const response = await loginMutation(values);

    const result = response.data?.login.__typename;
    if (result == "CurrentUser") {
      toast({
        title: "Zalogowano",
        description: "",
        status: "success",
      });

      refetchActiveCustomer();
      onSuccess?.();
    } else if (result == "InvalidCredentialsError") {
      toast({
        title: "Błędne dane logowania",
        status: "warning",
      });
    } else if (result == "NotVerifiedError") {
      toast({
        title: "Konto nie zostało zweryfikowane",
        status: "warning",
      });

      onError?.("NotVerifiedError");
    } else {
      toast({
        title: "Wystąpił nieoczekiwany błąd",
        description: "Spróbuj ponownie później.",
        status: "error",
      });
    }
  };

  return (
    <LoginForm
      initialValues={{ email: "", password: "" }}
      onSubmit={handleLogin}
    />
  );
};

export default LoginWidget;

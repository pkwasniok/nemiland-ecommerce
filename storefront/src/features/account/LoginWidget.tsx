import { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GQL_MUTATION_LOGIN, GQL_QUERY_ACTIVE_CUSTOMER } from "@/lib/vendure";

import { LoginForm, LoginFormValues } from "@/features/form";
import { useToast } from "@chakra-ui/react";

interface LoginWidgetProps {
  onSuccess?: () => void;
  onError?: (error: "NotVerifiedError") => void;
}

const LoginWidget = ({ onSuccess, onError }: LoginWidgetProps) => {
  const toast = useToast();

  const { refetch: refetchActiveCustomer } = useQuery(
    GQL_QUERY_ACTIVE_CUSTOMER,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        if (data.activeCustomer != undefined) {
          onSuccess?.();
        }
      },
    }
  );

  const [loginMutation] = useMutation(GQL_MUTATION_LOGIN, {
    refetchQueries: [GQL_QUERY_ACTIVE_CUSTOMER],
    onCompleted: (data) => {
      const result = data.login.__typename;

      if (result == "CurrentUser") {
        toast({
          title: "Zalogowano",
          description: "",
          status: "success",
        });

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
    },
  });

  const handleLogin = async (values: LoginFormValues) => {
    loginMutation({ variables: values });
  };

  return (
    <LoginForm
      initialValues={{ email: "", password: "" }}
      onSubmit={handleLogin}
    />
  );
};

export default LoginWidget;

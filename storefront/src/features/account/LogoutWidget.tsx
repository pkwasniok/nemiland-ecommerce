import { useMutation, useQuery } from "urql";
import { GQL_MUTATION_LOGOUT, GQL_QUERY_ACTIVE_CUSTOMER } from "@/lib/vendure";

import { useToast, Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

interface LogoutWidgetProps {
  onSuccess?: () => void;
}

const LogoutWidget = ({ onSuccess }: LogoutWidgetProps) => {
  const toast = useToast();

  const [, refetchActiveCustomer] = useQuery({
    query: GQL_QUERY_ACTIVE_CUSTOMER,
    requestPolicy: "network-only",
    pause: true,
  });
  const [, logoutMutation] = useMutation(GQL_MUTATION_LOGOUT);

  const handleLogout = async () => {
    const response = await logoutMutation({});

    const result = response.data?.logout.__typename;
    if (result == "Success") {
      toast({
        title: "Wylogowano",
        status: "success",
      });

      refetchActiveCustomer();
      onSuccess?.();
    } else {
      toast({
        title: "Wystąpił nieoczekiwany błąd",
        description: "Spróbuj ponownie później.",
        status: "error",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      leftIcon={<FiLogOut />}
      justifyContent="start"
      onClick={handleLogout}
    >
      Wyloguj się
    </Button>
  );
};

export default LogoutWidget;

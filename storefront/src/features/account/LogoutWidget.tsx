import { useMutation } from "@apollo/client";
import { GQL_MUTATION_LOGOUT, GQL_QUERY_ACTIVE_CUSTOMER } from "@/lib/vendure";

import { useToast, Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

interface LogoutWidgetProps {
  onSuccess?: () => void;
}

const LogoutWidget = ({ onSuccess }: LogoutWidgetProps) => {
  const toast = useToast();

  const [logoutMutation] = useMutation(GQL_MUTATION_LOGOUT, {
    refetchQueries: [GQL_QUERY_ACTIVE_CUSTOMER],
    onCompleted: (data) => {
      const result = data.logout.__typename;
      if (result == "Success") {
        toast({
          title: "Wylogowano",
          status: "success",
        });

        onSuccess?.();
      } else {
        toast({
          title: "Wystąpił nieoczekiwany błąd",
          description: "Spróbuj ponownie później.",
          status: "error",
        });
      }
    },
  });

  const handleLogout = async () => {
    logoutMutation({});
  };

  return (
    <Button leftIcon={<FiLogOut />} onClick={handleLogout} maxW="300px">
      Wyloguj się
    </Button>
  );
};

export default LogoutWidget;

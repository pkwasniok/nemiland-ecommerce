import { useMutation } from "urql";
import { GQL_MUTATION_LOGOUT } from "@/lib/vendure";

import { useToast, Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

interface LogoutWidgetProps {
  onSuccess?: () => void;
}

const LogoutWidget = ({ onSuccess }: LogoutWidgetProps) => {
  const toast = useToast();

  const [, logoutMutation] = useMutation(GQL_MUTATION_LOGOUT);

  const handleLogout = async () => {
    const response = await logoutMutation({});

    const result = response.data?.logout.__typename;
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

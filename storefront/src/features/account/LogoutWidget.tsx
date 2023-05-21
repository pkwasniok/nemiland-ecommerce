import { useLogout } from "@/features/ecommerce";
import { useToast, Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

interface LogoutWidgetProps {
  onSuccess?: () => void;
}

const LogoutWidget = ({ onSuccess }: LogoutWidgetProps) => {
  const toast = useToast();
  const { logout } = useLogout();

  const handleClick = async () => {
    logout();
    onSuccess?.();
    toast({
      title: "Wylogowano",
      status: "success",
    });
  };

  return (
    <Button leftIcon={<FiLogOut />} onClick={handleClick} maxW="300px">
      Wyloguj się
    </Button>
  );
};

export default LogoutWidget;

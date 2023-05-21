import { graphql } from "@/__graphql__";
import { useMutation } from "@apollo/client";

const GQL_MUTATION_LOGOUT = graphql(`
  mutation LogoutHook {
    logout {
      success
    }
  }
`);

interface LogoutHookProps {
  onSuccess?: () => void;
}

const useLogout = ({ onSuccess }: LogoutHookProps) => {
  const [logoutMutation] = useMutation(GQL_MUTATION_LOGOUT);

  const logout = () => {
    logoutMutation();
    onSuccess?.();
  };

  return { logout };
};

export default useLogout;

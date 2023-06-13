import { useMutation } from "@apollo/client";

import { GQL_MUTATION_LOGIN } from "../queries/login.gql";
import { GQL_MUTATION_REGISTER } from "../queries/register.gql";
import { GQL_MUTATION_LOGOUT } from "../queries/logout.gql";

import {
  RegisterMutationVariables,
  LoginMutationVariables,
} from "@/__graphql__/graphql";

interface CustomerHookProps {
  onRegister?: () => void;
  onLogin?: () => void;
  onLogout?: () => void;
}

const useCustomer = ({ onRegister, onLogin, onLogout }: CustomerHookProps) => {
  const [registerMutation] = useMutation(GQL_MUTATION_REGISTER, {
    onCompleted: (data) => {
      const result = data.registerCustomerAccount.__typename;
      if (result == "Success") {
        onRegister?.();
      }
    },
  });

  const register = (props: RegisterMutationVariables) => {
    registerMutation({ variables: props });
  };

  const [loginMutation] = useMutation(GQL_MUTATION_LOGIN, {
    onCompleted: (data) => {
      const result = data.login.__typename;
      if (result == "CurrentUser") {
        onLogin?.();
      }
    },
  });

  const login = (props: LoginMutationVariables) => {
    loginMutation({ variables: props });
  };

  const [logoutMutation] = useMutation(GQL_MUTATION_LOGOUT, {
    onCompleted: (data) => {
      const result = data.logout.__typename;
      if (result == "Success") {
        onLogout?.();
      }
    },
  });

  const logout = () => {
    logoutMutation();
  };

  const requestEmailVerification = () => {};

  const verifyEmail = () => {};

  const requestPasswordReset = () => {};

  const resetPassword = () => {};

  return {
    register,
    login,
    logout,
    requestEmailVerification,
    verifyEmail,
    requestPasswordReset,
    resetPassword,
  };
};

export default useCustomer;

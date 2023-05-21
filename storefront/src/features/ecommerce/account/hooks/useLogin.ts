import { graphql } from "@/__graphql__";
import { useMutation } from "@apollo/client";

const GQL_MUTATION_LOGIN = graphql(`
  mutation LoginHook($email: String!, $password: String!) {
    login(username: $email, password: $password) {
      __typename
    }
  }
`);

type LoginHookError =
  | "NotVerifiedError"
  | "InvalidCredentialsError"
  | "UnknownError";

interface LoginHookProps {
  onSuccess?: () => void;
  onError?: (error: LoginHookError) => void;
}

const useLogin = ({ onSuccess, onError }: LoginHookProps) => {
  const [loginMutation] = useMutation(GQL_MUTATION_LOGIN, {
    onCompleted: (data) => {
      const result = data.login.__typename;

      if (result == "CurrentUser") {
        onSuccess?.();
      } else if (
        result == "NotVerifiedError" ||
        result == "InvalidCredentialsError"
      ) {
        onError?.(result);
      } else {
        onError?.("UnknownError");
      }
    },
  });

  const login = ({ email, password }: { email: string; password: string }) => {
    loginMutation({ variables: { email, password } });
  };

  return {
    login,
  };
};

export default useLogin;

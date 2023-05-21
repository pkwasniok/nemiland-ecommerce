import { graphql } from "@/__graphql__";
import { useMutation } from "@apollo/client";
import { RegisterHookMutationVariables } from "@/__graphql__/graphql";

const GQL_MUTATION_REGISTER = graphql(`
  mutation RegisterHook(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    registerCustomerAccount(
      input: {
        emailAddress: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    ) {
      __typename
    }
  }
`);

type RegisterHookError = "UnknownError";

interface RegisterHookProps {
  onSuccess?: () => void;
  onError?: (error: RegisterHookError) => void;
}

const useRegister = ({ onSuccess, onError }: RegisterHookProps) => {
  const [registerMutation] = useMutation(GQL_MUTATION_REGISTER, {
    onCompleted: (data) => {
      const result = data.registerCustomerAccount.__typename;

      if (result == "Success") {
        onSuccess?.();
      } else {
        onError?.("UnknownError");
      }
    },
  });

  const register = (values: RegisterHookMutationVariables) => {
    registerMutation({ variables: values });
  };

  return {
    register,
  };
};

export default useRegister;

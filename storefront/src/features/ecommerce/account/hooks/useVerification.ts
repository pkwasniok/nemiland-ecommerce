import { graphql } from "@/__graphql__";
import {
  VerificationHookRequestVerificationMutationVariables,
  VerificationHookVerifyMutationVariables,
} from "@/__graphql__/graphql";
import { useMutation } from "@apollo/client";

const GQL_MUTATION_REQUEST_VERIFICATION = graphql(`
  mutation VerificationHookRequestVerification($email: String!) {
    refreshCustomerVerification(emailAddress: $email) {
      __typename
    }
  }
`);

const GQL_MUTATION_VERIFY = graphql(`
  mutation VerificationHookVerify($token: String!) {
    verifyCustomerAccount(token: $token) {
      __typename
    }
  }
`);

const useVerification = () => {
  const [requestVerificationMutation] = useMutation(
    GQL_MUTATION_REQUEST_VERIFICATION
  );
  const [verifyMutation] = useMutation(GQL_MUTATION_VERIFY);

  const requestVerification = (
    values: VerificationHookRequestVerificationMutationVariables
  ) => {
    requestVerificationMutation({ variables: values });
  };

  const verify = (values: VerificationHookVerifyMutationVariables) => {
    verifyMutation({ variables: values });
  };

  return { requestVerification, verify };
};

export default useVerification;

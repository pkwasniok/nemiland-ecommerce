import { graphql } from "@/__graphql__";
import { useMutation, useQuery } from "@apollo/client";
import {
  ActiveCustomerHookCreateAddressMutationVariables,
  ActiveCustomerHookDeleteAddressMutationVariables,
  ActiveCustomerHookUpdateAddressMutationVariables,
  ActiveCustomerUpdateHookMutationVariables,
} from "@/__graphql__/graphql";

const GQL_QUERY_ACTIVE_CUSTOMER = graphql(`
  query ActiveCustomerHook {
    activeCustomer {
      id
      createdAt
      updatedAt
      firstName
      lastName
      emailAddress
      addresses {
        id
        createdAt
        updatedAt
        fullName
        phoneNumber
        streetLine1
        streetLine2
        postalCode
        city
      }
    }
  }
`);

const GQL_MUTATION_UPDATE_ACTIVE_CUSTOMER = graphql(`
  mutation ActiveCustomerUpdateHook($firstName: String, $lastName: String!) {
    updateCustomer(input: { firstName: $firstName, lastName: $lastName }) {
      __typename
    }
  }
`);

const GQL_MUTATION_CREATE_ADDRESS = graphql(`
  mutation ActiveCustomerHookCreateAddress(
    $fullName: String!
    $phoneNumber: String!
    $streetLine1: String!
    $streetLine2: String!
    $city: String!
    $postalCode: String!
  ) {
    createCustomerAddress(
      input: {
        fullName: $fullName
        phoneNumber: $phoneNumber
        streetLine1: $streetLine1
        streetLine2: $streetLine2
        city: $city
        postalCode: $postalCode
        countryCode: "PL"
      }
    ) {
      __typename
    }
  }
`);

const GQL_MUTATION_DELETE_ADDRESS = graphql(`
  mutation ActiveCustomerHookDeleteAddress($id: ID!) {
    deleteCustomerAddress(id: $id) {
      success
    }
  }
`);

const GQL_MUTATION_UPDATE_ADDRESS = graphql(`
  mutation ActiveCustomerHookUpdateAddress(
    $id: ID!
    $fullName: String!
    $phoneNumber: String!
    $streetLine1: String!
    $streetLine2: String!
    $city: String!
    $postalCode: String!
  ) {
    updateCustomerAddress(
      input: {
        id: $id
        fullName: $fullName
        phoneNumber: $phoneNumber
        streetLine1: $streetLine1
        streetLine2: $streetLine2
        city: $city
        postalCode: $postalCode
        countryCode: "PL"
      }
    ) {
      __typename
    }
  }
`);

const useActiveCustomer = () => {
  const { data, loading } = useQuery(GQL_QUERY_ACTIVE_CUSTOMER);

  const [updateActiveCustomerMutation] = useMutation(
    GQL_MUTATION_UPDATE_ACTIVE_CUSTOMER,
    {
      refetchQueries: [GQL_QUERY_ACTIVE_CUSTOMER],
    }
  );

  const [createAddressMutation] = useMutation(GQL_MUTATION_CREATE_ADDRESS, {
    refetchQueries: [GQL_QUERY_ACTIVE_CUSTOMER],
  });

  const [deleteAddressMutation] = useMutation(GQL_MUTATION_DELETE_ADDRESS, {
    refetchQueries: [GQL_QUERY_ACTIVE_CUSTOMER],
  });

  const [updateAddressMutation] = useMutation(GQL_MUTATION_UPDATE_ADDRESS, {
    refetchQueries: [GQL_QUERY_ACTIVE_CUSTOMER],
  });

  const activeCustomer = data?.activeCustomer ?? undefined;

  const updateActiveCustomer = (
    values: ActiveCustomerUpdateHookMutationVariables
  ) => {
    updateActiveCustomerMutation({ variables: values });
  };

  const createAddress = (
    values: ActiveCustomerHookCreateAddressMutationVariables
  ) => {
    createAddressMutation({ variables: values });
  };

  const deleteAddress = (
    values: ActiveCustomerHookDeleteAddressMutationVariables
  ) => {
    deleteAddressMutation({ variables: values });
  };

  const updateAddress = (
    values: ActiveCustomerHookUpdateAddressMutationVariables
  ) => {
    updateAddressMutation({ variables: values });
  };

  return {
    loading,
    activeCustomer,
    updateActiveCustomer,
    createAddress,
    deleteAddress,
    updateAddress,
  };
};

export default useActiveCustomer;

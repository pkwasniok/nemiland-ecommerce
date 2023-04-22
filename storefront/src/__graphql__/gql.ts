/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Addresses {\n    activeCustomer {\n      addresses {\n        id\n        createdAt\n        updatedAt\n        fullName\n        streetLine1\n        streetLine2\n        city\n        province\n        postalCode\n        country {\n          code\n          name\n        }\n        phoneNumber\n        defaultShippingAddress\n        defaultBillingAddress\n      }\n    }\n  }\n": types.AddressesDocument,
    "\n  mutation CreateAddress(\n    $fullName: String!\n    $phoneNumber: String!\n    $streetLine1: String!\n    $streetLine2: String!\n    $city: String!\n    $postalCode: String!\n  ) {\n    createCustomerAddress(\n      input: {\n        fullName: $fullName\n        phoneNumber: $phoneNumber\n        streetLine1: $streetLine1\n        streetLine2: $streetLine2\n        city: $city\n        postalCode: $postalCode\n        countryCode: \"PL\"\n      }\n    ) {\n      __typename\n    }\n  }\n": types.CreateAddressDocument,
    "\n  mutation UpdateAddress(\n    $id: ID!\n    $fullName: String!\n    $phoneNumber: String!\n    $streetLine1: String!\n    $streetLine2: String!\n    $city: String!\n    $postalCode: String!\n  ) {\n    updateCustomerAddress(\n      input: {\n        id: $id\n        fullName: $fullName\n        phoneNumber: $phoneNumber\n        streetLine1: $streetLine1\n        streetLine2: $streetLine2\n        city: $city\n        postalCode: $postalCode\n        countryCode: \"PL\"\n      }\n    ) {\n      __typename\n    }\n  }\n": types.UpdateAddressDocument,
    "\n  mutation DeleteAddress($id: ID!) {\n    deleteCustomerAddress(id: $id) {\n      success\n    }\n  }\n": types.DeleteAddressDocument,
    "\n  query Collections {\n    collections {\n      items {\n        id\n        createdAt\n        updatedAt\n        slug\n        name\n      }\n    }\n  }\n": types.CollectionsDocument,
    "\n  mutation Register(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n  ) {\n    registerCustomerAccount(\n      input: {\n        firstName: $firstName\n        lastName: $lastName\n        emailAddress: $email\n        password: $password\n      }\n    ) {\n      __typename\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(username: $email, password: $password) {\n      __typename\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout {\n    logout {\n      __typename\n    }\n  }\n": types.LogoutDocument,
    "\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(emailAddress: $email) {\n      __typename\n    }\n  }\n": types.RequestPasswordResetDocument,
    "\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, password: $newPassword) {\n      __typename\n    }\n  }\n": types.ResetPasswordDocument,
    "\n  mutation RequestVerification($email: String!) {\n    refreshCustomerVerification(emailAddress: $email) {\n      __typename\n    }\n  }\n": types.RequestVerificationDocument,
    "\n  mutation Verify($token: String!) {\n    verifyCustomerAccount(token: $token) {\n      __typename\n    }\n  }\n": types.VerifyDocument,
    "\n  query ActiveCustomer {\n    activeCustomer {\n      id\n      firstName\n      lastName\n    }\n  }\n": types.ActiveCustomerDocument,
    "\n  query ActiveChannel {\n    activeChannel {\n      id\n    }\n  }\n": types.ActiveChannelDocument,
    "\n  mutation UpdateCustomer($firstName: String, $lastName: String!) {\n    updateCustomer(input: { firstName: $firstName, lastName: $lastName }) {\n      __typename\n    }\n  }\n": types.UpdateCustomerDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Addresses {\n    activeCustomer {\n      addresses {\n        id\n        createdAt\n        updatedAt\n        fullName\n        streetLine1\n        streetLine2\n        city\n        province\n        postalCode\n        country {\n          code\n          name\n        }\n        phoneNumber\n        defaultShippingAddress\n        defaultBillingAddress\n      }\n    }\n  }\n"): (typeof documents)["\n  query Addresses {\n    activeCustomer {\n      addresses {\n        id\n        createdAt\n        updatedAt\n        fullName\n        streetLine1\n        streetLine2\n        city\n        province\n        postalCode\n        country {\n          code\n          name\n        }\n        phoneNumber\n        defaultShippingAddress\n        defaultBillingAddress\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAddress(\n    $fullName: String!\n    $phoneNumber: String!\n    $streetLine1: String!\n    $streetLine2: String!\n    $city: String!\n    $postalCode: String!\n  ) {\n    createCustomerAddress(\n      input: {\n        fullName: $fullName\n        phoneNumber: $phoneNumber\n        streetLine1: $streetLine1\n        streetLine2: $streetLine2\n        city: $city\n        postalCode: $postalCode\n        countryCode: \"PL\"\n      }\n    ) {\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAddress(\n    $fullName: String!\n    $phoneNumber: String!\n    $streetLine1: String!\n    $streetLine2: String!\n    $city: String!\n    $postalCode: String!\n  ) {\n    createCustomerAddress(\n      input: {\n        fullName: $fullName\n        phoneNumber: $phoneNumber\n        streetLine1: $streetLine1\n        streetLine2: $streetLine2\n        city: $city\n        postalCode: $postalCode\n        countryCode: \"PL\"\n      }\n    ) {\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateAddress(\n    $id: ID!\n    $fullName: String!\n    $phoneNumber: String!\n    $streetLine1: String!\n    $streetLine2: String!\n    $city: String!\n    $postalCode: String!\n  ) {\n    updateCustomerAddress(\n      input: {\n        id: $id\n        fullName: $fullName\n        phoneNumber: $phoneNumber\n        streetLine1: $streetLine1\n        streetLine2: $streetLine2\n        city: $city\n        postalCode: $postalCode\n        countryCode: \"PL\"\n      }\n    ) {\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateAddress(\n    $id: ID!\n    $fullName: String!\n    $phoneNumber: String!\n    $streetLine1: String!\n    $streetLine2: String!\n    $city: String!\n    $postalCode: String!\n  ) {\n    updateCustomerAddress(\n      input: {\n        id: $id\n        fullName: $fullName\n        phoneNumber: $phoneNumber\n        streetLine1: $streetLine1\n        streetLine2: $streetLine2\n        city: $city\n        postalCode: $postalCode\n        countryCode: \"PL\"\n      }\n    ) {\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteAddress($id: ID!) {\n    deleteCustomerAddress(id: $id) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteAddress($id: ID!) {\n    deleteCustomerAddress(id: $id) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Collections {\n    collections {\n      items {\n        id\n        createdAt\n        updatedAt\n        slug\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Collections {\n    collections {\n      items {\n        id\n        createdAt\n        updatedAt\n        slug\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n  ) {\n    registerCustomerAccount(\n      input: {\n        firstName: $firstName\n        lastName: $lastName\n        emailAddress: $email\n        password: $password\n      }\n    ) {\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation Register(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n  ) {\n    registerCustomerAccount(\n      input: {\n        firstName: $firstName\n        lastName: $lastName\n        emailAddress: $email\n        password: $password\n      }\n    ) {\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(username: $email, password: $password) {\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(username: $email, password: $password) {\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout {\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout {\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(emailAddress: $email) {\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(emailAddress: $email) {\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, password: $newPassword) {\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, password: $newPassword) {\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RequestVerification($email: String!) {\n    refreshCustomerVerification(emailAddress: $email) {\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation RequestVerification($email: String!) {\n    refreshCustomerVerification(emailAddress: $email) {\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Verify($token: String!) {\n    verifyCustomerAccount(token: $token) {\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation Verify($token: String!) {\n    verifyCustomerAccount(token: $token) {\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ActiveCustomer {\n    activeCustomer {\n      id\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  query ActiveCustomer {\n    activeCustomer {\n      id\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ActiveChannel {\n    activeChannel {\n      id\n    }\n  }\n"): (typeof documents)["\n  query ActiveChannel {\n    activeChannel {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCustomer($firstName: String, $lastName: String!) {\n    updateCustomer(input: { firstName: $firstName, lastName: $lastName }) {\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCustomer($firstName: String, $lastName: String!) {\n    updateCustomer(input: { firstName: $firstName, lastName: $lastName }) {\n      __typename\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
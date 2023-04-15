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
    "\n  mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {\n    registerCustomerAccount(input: {\n      firstName: $firstName,\n      lastName: $lastName,\n      emailAddress: $email,\n      password: $password,\n    }) {\n      __typename,\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(username: $email, password: $password) {\n      __typename,\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout {\n    logout {\n      __typename,\n    }\n  }\n": types.LogoutDocument,
    "\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(emailAddress: $email) {\n      __typename,\n    }\n  }\n": types.RequestPasswordResetDocument,
    "\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, password: $newPassword) {\n      __typename,\n    }\n  }\n": types.ResetPasswordDocument,
    "\n  mutation RequestVerification($email: String!) {\n    refreshCustomerVerification(emailAddress: $email) {\n      __typename,\n    }\n  }\n": types.RequestVerificationDocument,
    "\n  mutation Verify($token: String!) {\n    verifyCustomerAccount(token: $token) {\n      __typename,\n    }\n  }\n": types.VerifyDocument,
    "\n  query ActiveCustomer {\n    activeCustomer {\n      id,\n    }\n  }\n": types.ActiveCustomerDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {\n    registerCustomerAccount(input: {\n      firstName: $firstName,\n      lastName: $lastName,\n      emailAddress: $email,\n      password: $password,\n    }) {\n      __typename,\n    }\n  }\n"): (typeof documents)["\n  mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {\n    registerCustomerAccount(input: {\n      firstName: $firstName,\n      lastName: $lastName,\n      emailAddress: $email,\n      password: $password,\n    }) {\n      __typename,\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(username: $email, password: $password) {\n      __typename,\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(username: $email, password: $password) {\n      __typename,\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Logout {\n    logout {\n      __typename,\n    }\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout {\n      __typename,\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(emailAddress: $email) {\n      __typename,\n    }\n  }\n"): (typeof documents)["\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(emailAddress: $email) {\n      __typename,\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, password: $newPassword) {\n      __typename,\n    }\n  }\n"): (typeof documents)["\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, password: $newPassword) {\n      __typename,\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RequestVerification($email: String!) {\n    refreshCustomerVerification(emailAddress: $email) {\n      __typename,\n    }\n  }\n"): (typeof documents)["\n  mutation RequestVerification($email: String!) {\n    refreshCustomerVerification(emailAddress: $email) {\n      __typename,\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Verify($token: String!) {\n    verifyCustomerAccount(token: $token) {\n      __typename,\n    }\n  }\n"): (typeof documents)["\n  mutation Verify($token: String!) {\n    verifyCustomerAccount(token: $token) {\n      __typename,\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ActiveCustomer {\n    activeCustomer {\n      id,\n    }\n  }\n"): (typeof documents)["\n  query ActiveCustomer {\n    activeCustomer {\n      id,\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
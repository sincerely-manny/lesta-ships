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
    "query ByIdQuery($vehicleId: String) {\n    vehicles(lang: \"ru\", vehicleId: $vehicleId, ) {\n    id\n    description\n    ttc {\n        description\n        name\n        title\n        unit\n        value\n    }\n  }\n}\n": types.ByIdQueryDocument,
    "query AllShipsQuery {\n  vehicles(lang: \"ru\", isCatalogue: false) {\n    id\n    title\n    titleShort\n    icons {\n      large\n      medium\n    }\n    level\n    type {\n      name\n    \ttitle\n      icons {\n        default\n      }\n    }\n    nation {\n      name\n      title\n      color\n      icons {\n        small\n        medium\n        large\n      }\n    }\n    isClan\n    isPremium\n    isSpecial\n  }\n}\n": types.AllShipsQueryDocument,
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
export function gql(source: "query ByIdQuery($vehicleId: String) {\n    vehicles(lang: \"ru\", vehicleId: $vehicleId, ) {\n    id\n    description\n    ttc {\n        description\n        name\n        title\n        unit\n        value\n    }\n  }\n}\n"): (typeof documents)["query ByIdQuery($vehicleId: String) {\n    vehicles(lang: \"ru\", vehicleId: $vehicleId, ) {\n    id\n    description\n    ttc {\n        description\n        name\n        title\n        unit\n        value\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query AllShipsQuery {\n  vehicles(lang: \"ru\", isCatalogue: false) {\n    id\n    title\n    titleShort\n    icons {\n      large\n      medium\n    }\n    level\n    type {\n      name\n    \ttitle\n      icons {\n        default\n      }\n    }\n    nation {\n      name\n      title\n      color\n      icons {\n        small\n        medium\n        large\n      }\n    }\n    isClan\n    isPremium\n    isSpecial\n  }\n}\n"): (typeof documents)["query AllShipsQuery {\n  vehicles(lang: \"ru\", isCatalogue: false) {\n    id\n    title\n    titleShort\n    icons {\n      large\n      medium\n    }\n    level\n    type {\n      name\n    \ttitle\n      icons {\n        default\n      }\n    }\n    nation {\n      name\n      title\n      color\n      icons {\n        small\n        medium\n        large\n      }\n    }\n    isClan\n    isPremium\n    isSpecial\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
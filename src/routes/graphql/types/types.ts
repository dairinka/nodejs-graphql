import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';

export const MemberTypeId = new GraphQLNonNull(
  new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
      basic: { value: 'basic' },
      business: { value: 'business' },
    },
  }),
);
export const gqlId = new GraphQLNonNull(UUIDType);
export const gqlBoolean = new GraphQLNonNull(GraphQLBoolean);
export const gqlFloat = new GraphQLNonNull(GraphQLFloat);
export const gqlInt = new GraphQLNonNull(GraphQLInt);
export const gqlString = new GraphQLNonNull(GraphQLString);

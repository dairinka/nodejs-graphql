import { GraphQLInputObjectType, GraphQLObjectType } from 'graphql';
import { gqlFloat, gqlId, gqlString } from '../types/gqlTypes.js';

export const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: gqlId },
    name: { type: gqlString },
    balance: { type: gqlFloat },
  }),
});

export const CreateInputUser = new GraphQLInputObjectType({
  name: 'CreateInputUser',
  fields: () => ({
    name: { type: gqlString },
    balance: { type: gqlFloat },
  }),
});

import { GraphQLObjectType } from 'graphql';
import { gqlFloat, gqlId, gqlString } from '../types/types.js';

export const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: gqlId },
    name: { type: gqlString },
    balance: { type: gqlFloat },
  }),
});

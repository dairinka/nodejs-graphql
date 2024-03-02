import { GraphQLObjectType } from 'graphql';
import { MemberTypeId, gqlFloat, gqlInt } from '../types/types.js';

export const MemberType = new GraphQLObjectType({
  name: 'MemberTypes',
  fields: () => ({
    id: {
      type: MemberTypeId,
    },
    discount: { type: gqlFloat },
    postsLimitPerMonth: { type: gqlInt },
  }),
});

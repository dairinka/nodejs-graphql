import { GraphQLObjectType } from 'graphql';
import { MemberTypeId, gqlFloat, gqlInt } from '../types/gqlTypes.js';

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: {
      type: MemberTypeId,
    },
    discount: { type: gqlFloat },
    postsLimitPerMonth: { type: gqlInt },
  }),
});

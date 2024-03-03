import { GraphQLObjectType } from 'graphql';

import { MemberTypeId, gqlBoolean, gqlId, gqlInt } from '../types/gqlTypes.js';

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: gqlId },
    userId: { type: gqlId },
    isMale: { type: gqlBoolean },
    memberTypeId: { type: MemberTypeId },
    yearOfBirth: { type: gqlInt },
  }),
});

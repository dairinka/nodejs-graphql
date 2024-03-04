import { GraphQLList, GraphQLObjectType } from 'graphql';
import { MemberTypeId, gqlFloat, gqlInt } from '../types/gqlTypes.js';
import { Context, IMemberType } from '../types/types.js';
import { Profile } from './Profile.js';

export const MemberType: GraphQLObjectType<IMemberType, Context> = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: {
      type: MemberTypeId,
    },
    discount: { type: gqlFloat },
    postsLimitPerMonth: { type: gqlInt },
    profiles: {
      type: new GraphQLList(Profile),
      resolve: async (
        source: IMemberType,
        _args,
        { profilesByMemberTypeLoader }: Context,
      ) => {
        try {
          return await profilesByMemberTypeLoader.load(source.id);
        } catch (err) {
          console.log(err);
        }
      },
    },
  }),
});

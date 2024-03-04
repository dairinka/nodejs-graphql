import { GraphQLObjectType } from 'graphql';

import { MemberTypeId, gqlBoolean, gqlId, gqlInt } from '../types/gqlTypes.js';
import { Context, IProfile, IUser } from '../types/types.js';
import { User } from './User.js';
import { MemberType } from './MemberType.js';

export const Profile: GraphQLObjectType<IProfile, Context> = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: gqlId },
    userId: { type: gqlId },
    isMale: { type: gqlBoolean },
    memberTypeId: { type: MemberTypeId },
    yearOfBirth: { type: gqlInt },
    user: {
      type: User,
      resolve: async (source: IProfile, _args, { userLoader }: Context) => {
        try {
          return await userLoader.load(source.userId);
        } catch (err) {
          console.log(err);
        }
      },
    },
    memberType: {
      type: MemberType,
      resolve: async (source: IProfile, _args, { memberTypeLoader }: Context) => {
        try {
          return await memberTypeLoader.load(source.memberTypeId);
        } catch (err) {
          console.log(err);
        }
      },
    },
  }),
});

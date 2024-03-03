import { GraphQLList, GraphQLObjectType } from 'graphql';
import { MemberType } from './shemas/MemberType.js';
import { Post } from './shemas/Post.js';
import { Profile } from './shemas/Profile.js';
import { User } from './shemas/User.js';
import { MemberTypeId, gqlId } from './types/gqlTypes.js';
import { Context, MemberTypeIdType } from './types/types.js';

export const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: User,
      args: {
        id: { type: gqlId },
      },

      resolve: async (_source, args: { id: string }, { db }: Context) => {
        console.log('/// query user');
        console.log('resolve users', db);
        return await db.user.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    users: {
      type: new GraphQLList(User),
      resolve: async (_source, _args, { db }: Context) => {
        console.log('/// query usersss');
        console.log('resolve users', db);
        try {
          return await db.user.findMany();
        } catch (err) {
          console.log(err);
        }
      },
    },
    memberType: {
      type: MemberType,
      args: {
        id: { type: MemberTypeId },
      },
      resolve: async (_source, args: { id: MemberTypeIdType }, { db }: Context) => {
        try {
          return await db.memberType.findFirst({
            where: {
              id: args.id,
            },
          });
        } catch (err) {
          console.log(err);
        }
      },
    },

    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_source, _args, { db }: Context) => {
        try {
          return await db.memberType.findMany();
        } catch (err) {
          console.log(err);
        }
      },
    },
    post: {
      type: Post,
      args: {
        id: { type: gqlId },
      },
      resolve: async (_source, args: { id: string }, { db }: Context) => {
        return await db.post.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: async (_source, _args, { db }: Context) => {
        try {
          return await db.post.findMany();
        } catch (err) {
          console.log(err);
        }
      },
    },
    profile: {
      type: Profile,
      args: {
        id: { type: gqlId },
      },
      resolve: async (_source, args: { id: string }, { db }: Context) => {
        return await db.profile.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    profiles: {
      type: new GraphQLList(Profile),
      resolve: async (_source, _args, { db }: Context) => {
        try {
          return await db.profile.findMany();
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
});

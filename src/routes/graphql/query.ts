import { GraphQLList, GraphQLObjectType, GraphQLResolveInfo } from 'graphql';
import { MemberType } from './shemas/MemberType.js';
import { Post } from './shemas/Post.js';
import { Profile } from './shemas/Profile.js';
import { User } from './shemas/User.js';
import { MemberTypeId, gqlId } from './types/gqlTypes.js';
import { Context, IUser, MemberTypeIdType } from './types/types.js';
import {
  ResolveTree,
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';

export const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: User,
      args: {
        id: { type: gqlId },
      },
      resolve: async (_source, args: IUser, { db }: Context) => {
        console.log('/// query user');

        const result = await db.user.findUnique({
          where: {
            id: args.id,
          },
        });
        console.log('result user', result);
        return result;
      },
    },
    users: {
      type: new GraphQLList(User),
      resolve: async (
        _source,
        _args,
        { db, userLoader }: Context,
        info: GraphQLResolveInfo,
      ) => {
        const parseInfo = parseResolveInfo(info) as ResolveTree;
        const { fields } = simplifyParsedResolveInfoFragmentWithType(
          parseInfo,
          new GraphQLList(User),
        );
        const userSubscribedTo = 'userSubscribedTo' in fields;
        const subscribedToUser = 'subscribedToUser' in fields;
        console.log('/// query usersss');
        console.log('parseInfo', fields);
        //console.log('resolve users', db);
        try {
          const users = await db.user.findMany({
            include: {
              userSubscribedTo,
              subscribedToUser,
            },
          });
          const result = users.forEach((user) => {
            userLoader.prime(user.id, user);
          });
          console.log('users result', result);
          return result;
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
        console.log('/// memberType');
        try {
          const result = await db.memberType.findFirst({
            where: {
              id: args.id,
            },
          });
          console.log('memberType result', result);
          return result;
        } catch (err) {
          console.log(err);
        }
      },
    },

    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_source, _args, { db }: Context) => {
        console.log('/// query memberTypes');
        try {
          const result = await db.memberType.findMany();
          console.log('memberTypes result', result);
          return result;
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
        console.log('/// query post');
        const result = await db.post.findUnique({
          where: {
            id: args.id,
          },
        });
        console.log('post result', result);
        return result;
      },
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: async (_source, _args, { db }: Context) => {
        console.log('/// query posts');
        try {
          const result = await db.post.findMany();
          console.log('posts result', result);
          return result;
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
        console.log('/// query profile');
        const result = await db.profile.findUnique({
          where: {
            id: args.id,
          },
        });
        console.log('profile result', result);
        return result;
      },
    },
    profiles: {
      type: new GraphQLList(Profile),
      resolve: async (_source, _args, { db }: Context) => {
        console.log('/// query profiles');
        try {
          const result = await db.profile.findMany();
          console.log('profile result', result);
          return result;
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
});

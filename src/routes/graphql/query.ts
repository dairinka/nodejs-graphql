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
        try {
          return await db.user.findUnique({
            where: {
              id: args.id,
            },
          });
        } catch (err) {
          console.log(err);
        }
      },
    },
    users: {
      type: new GraphQLList(User),
      resolve: async (
        _source,
        _args,
        { db, userSubscribedById, subscribedToUserById }: Context,
        info: GraphQLResolveInfo,
      ) => {
        const parseInfo = parseResolveInfo(info) as ResolveTree;
        const { fields } = simplifyParsedResolveInfoFragmentWithType(
          parseInfo,
          new GraphQLList(User),
        );
        const userSubscribedTo = 'userSubscribedTo' in fields;
        const subscribedToUser = 'subscribedToUser' in fields;

        try {
          const users = await db.user.findMany({
            include: {
              userSubscribedTo,
              subscribedToUser,
            },
          });
          users.forEach((user) => {
            if (userSubscribedTo) {
              userSubscribedById.prime(
                user.id,
                users.filter((currentUser) =>
                  currentUser.userSubscribedTo.some(
                    (el) => el.authorId === currentUser.id,
                  ),
                ),
              );
            }

            if (subscribedToUser) {
              subscribedToUserById.prime(
                user.id,
                users.filter((currentUser) =>
                  currentUser.subscribedToUser.some(
                    (el) => el.subscriberId === currentUser.id,
                  ),
                ),
              );
            }
          });
          return users;
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
        try {
          return await db.post.findUnique({
            where: {
              id: args.id,
            },
          });
        } catch (err) {
          console.log(err);
        }
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
        try {
          return await db.profile.findUnique({
            where: {
              id: args.id,
            },
          });
        } catch (err) {
          console.log(err);
        }
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

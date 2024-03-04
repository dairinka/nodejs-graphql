import { GraphQLInputObjectType, GraphQLList, GraphQLObjectType } from 'graphql';
import { gqlFloat, gqlId, gqlString } from '../types/gqlTypes.js';
import { Profile } from './Profile.js';
import { Context, IUser } from '../types/types.js';
import { Post } from './Post.js';

export const User: GraphQLObjectType<IUser, Context> = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: gqlId },
    name: { type: gqlString },
    balance: { type: gqlFloat },
    profile: {
      type: Profile,
      resolve: async (source: IUser, _args, { profileByUserLoader }: Context) => {
        try {
          const result = await profileByUserLoader.load(source.id);
          console.log('profile in user', result);
          return result;
        } catch (err) {
          console.log(err);
        }
      },
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: async (source: IUser, _args, { postsByAuthorLoader }: Context) => {
        try {
          const result = await postsByAuthorLoader.load(source.id);
          console.log('posts: in user', result);
          return result;
        } catch (err) {
          console.log(err);
        }
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(User),
      resolve: async (source: IUser, _args, { userLoader }: Context) => {
        try {
          if (source.userSubscribedTo) {
            const result = await userLoader.loadMany(
              source.userSubscribedTo.map(({ authorId }) => authorId),
            );
            console.log(' userSubscribedTo in user', result);
            return result;
          }
        } catch (err) {
          console.log(err);
        }
      },
    },
    subscribedToUser: {
      type: new GraphQLList(User),
      resolve: async (source: IUser, _args, { userLoader }: Context) => {
        try {
          if (source.subscribedToUser) {
            const result = await userLoader.loadMany(
              source.subscribedToUser.map(({ subscriberId }) => subscriberId),
            );
            console.log(' userSubscribedTo in user', result);
            return result;
          }
        } catch (err) {
          console.log(err);
        }
      },
    },
  }),
});

export const CreateInputUser = new GraphQLInputObjectType({
  name: 'CreateInputUser',
  fields: () => ({
    name: { type: gqlString },
    balance: { type: gqlFloat },
  }),
});

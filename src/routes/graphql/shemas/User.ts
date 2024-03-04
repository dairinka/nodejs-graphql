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
          return await profileByUserLoader.load(source.id);
        } catch (err) {
          console.log(err);
        }
      },
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: async (source: IUser, _args, { postsByAuthorLoader }: Context) => {
        try {
          return await postsByAuthorLoader.load(source.id);
        } catch (err) {
          console.log(err);
        }
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(User),
      resolve: async (source: IUser, _args, { userSubscribedById }: Context) => {
        try {
          return await userSubscribedById.load(source.id);
        } catch (err) {
          console.log(err);
        }
      },
    },
    subscribedToUser: {
      type: new GraphQLList(User),
      resolve: async (source: IUser, _args, { subscribedToUserById }: Context) => {
        try {
          return await subscribedToUserById.load(source.id);
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

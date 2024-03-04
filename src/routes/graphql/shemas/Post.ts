import { GraphQLObjectType } from 'graphql';

import { gqlId, gqlString } from '../types/gqlTypes.js';
import { Context, IPost, IUser } from '../types/types.js';
import { User } from './User.js';

export const Post: GraphQLObjectType<IPost, Context> = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: gqlId },
    title: { type: gqlString },
    content: { type: gqlString },
    authorId: { type: gqlId },
    author: {
      type: User,
      resolve: async (source: IPost, _args, { userLoader }: Context) => {
        try {
          return await userLoader.load(source.authorId);
        } catch (err) {
          console.log(err);
        }
      },
    },
  }),
});

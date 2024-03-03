import { GraphQLObjectType } from 'graphql';

import { gqlId, gqlString } from '../types/gqlTypes.js';

export const Post = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: gqlId },
    authorId: { type: gqlId },
    title: { type: gqlString },
    content: { type: gqlString },
  }),
});

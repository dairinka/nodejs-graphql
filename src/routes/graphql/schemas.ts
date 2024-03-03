import { Type } from '@fastify/type-provider-typebox';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { User } from './shemas/User.js';
import { UUIDType } from './types/uuid.js';
import { MemberType } from './shemas/MemberType.js';
import { Post } from './shemas/Post.js';
import { Profile } from './shemas/Profile.js';
import { MemberTypeId, gqlId } from './types/types.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const commonSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: User,
        args: {
          id: { type: gqlId },
        },
      },
      users: {
        type: new GraphQLList(User),
      },
      memberType: {
        type: MemberType,
        args: {
          id: { type: MemberTypeId },
        },
      },
      memberTypes: {
        type: new GraphQLList(MemberType),
      },
      post: {
        type: Post,
        args: {
          id: { type: gqlId },
        },
      },
      posts: {
        type: new GraphQLList(Post),
      },
      profile: {
        type: Profile,
        args: {
          id: { type: gqlId },
        },
      },
      profiles: {
        type: new GraphQLList(Profile),
      },
    },
  }),
});

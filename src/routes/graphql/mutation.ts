import { PrismaClient } from '@prisma/client';
import { GraphQLObjectType } from 'graphql';
import { User, CreateInputUser } from './shemas/User.js';
import { CreateUser } from './types/types.js';

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: User,
      args: {
        dto: { type: CreateInputUser },
      },
      resolve: async ({ dto: data }: { dto: CreateUser }, prisma: PrismaClient) => {
        console.log('create user with data', data);
        return await prisma.user.create({ data });
      },
    },
  },
});

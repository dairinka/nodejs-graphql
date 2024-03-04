import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, commonSchema } from './schemas.js';
import { graphql, validate, parse } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { createDataLoaders } from './dataLoaders.js';
const DEPTHLIMIT = 5;

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },

    async handler(req) {
      const { prisma } = fastify;
      const dataLoaders = createDataLoaders(prisma);
      const { query, variables } = req.body;

      const err = validate(commonSchema, parse(query), [depthLimit(DEPTHLIMIT)]);
      if (Array.isArray(err) && err.length > 0) return { errors: err };
      const res = await graphql({
        schema: commonSchema,
        source: query,
        variableValues: variables,
        contextValue: {
          db: prisma,
          ...dataLoaders,
        },
      });

      return res;
    },
  });
};

export default plugin;

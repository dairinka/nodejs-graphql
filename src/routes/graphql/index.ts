import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { graphql, validate, parse } from 'graphql';
import depthLimit from 'graphql-depth-limit';
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
    //    schema: GraphQLSchema;
    // source: string | Source;
    // rootValue?: unknown;
    // contextValue?: unknown;
    // variableValues?: Maybe<{
    //   readonly [variable: string]: unknown;
    // }>;
    async handler({ body }) {
      const err = validate(schema, parse(body.query), [depthLimit(DEPTHLIMIT)]);
      if (Array.isArray(err) && err.length > 0) return { errors: err };
      const res = await graphql({
        schema,
        source: body.query,
        variableValues: body.variables,
      });
      return res;
    },
  });
};

export default plugin;

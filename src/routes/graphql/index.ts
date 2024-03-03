import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, commonSchema } from './schemas.js';
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
    async handler(req) {
      const err = validate(commonSchema, parse(req.body.query), [depthLimit(DEPTHLIMIT)]);
      //if (Array.isArray(err) && err.length > 0) return { errors: err };
      //console.log('schema', schema);
      console.log('req.body.query', req.body.query);
      console.log('err', err);
      const res = await graphql({
        schema: commonSchema,
        source: req.body.query,
        variableValues: req.body.variables,
      });
      console.log('response', res);
      return res;
    },
  });
};

export default plugin;

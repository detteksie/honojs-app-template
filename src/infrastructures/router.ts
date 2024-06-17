import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
// import { Hono } from 'hono';

// export const router = new Hono()

export const router = new OpenAPIHono()

  .doc('/doc', {
    info: {
      title: 'An API',
      version: 'v1',
    },
    openapi: '3.1.0',
  })

  .openapi(
    createRoute({
      method: 'get',
      path: '/hello',
      responses: {
        200: {
          description: 'Respond a message',
          content: {
            'application/json': {
              schema: z.object({
                message: z.string(),
              }),
            },
          },
        },
      },
    }),
    (c) => {
      return c.json({
        message: 'hello',
      });
    },
  )

  .get('/ui', swaggerUI({ url: '/doc' }));

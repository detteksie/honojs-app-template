import { cors } from 'hono/cors';
import { etag } from 'hono/etag';
import { logger } from 'hono/logger';
import { poweredBy } from 'hono/powered-by';
import { trimTrailingSlash } from 'hono/trailing-slash';
import createHttpError from 'http-errors';

import { router } from './infrastructures/router';
import { authController } from './modules/controller/auth.controller';
import { commentController } from './modules/controller/comment.controller';
import { postController } from './modules/controller/post.controller';
import { usersController } from './modules/controller/user.controller';
import { errorJson } from './utils/response.util';

export const newApp = () => {
  const app = router
    .use(logger(), cors(), poweredBy(), etag(), trimTrailingSlash())

    .get('/', (c) => {
      return c.redirect('/ui');
    })
    .route('/', authController)
    .route('v1/users', usersController)
    .route('v1/posts', postController)
    .route('v1/comments', commentController)

    .notFound((_c) => {
      throw createHttpError(404);
    })

    .onError(async (err, c) => {
      const newErr = errorJson(err);
      return c.json(newErr, (err as any).status || 500);
    });

  return app;
};

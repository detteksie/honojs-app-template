import { cors } from 'hono/cors';
import { etag } from 'hono/etag';
import { logger } from 'hono/logger';
import { poweredBy } from 'hono/powered-by';
import createHttpError from 'http-errors';

import { app } from './infrastructures/router';
import { authController } from './modules/controller/auth.controller';
import { commentController } from './modules/controller/comment.controller';
import { postController } from './modules/controller/post.controller';
import { usersController } from './modules/controller/user.controller';
import { errorJson } from './utils/response.util';

export const newServer = () => {
  app.use(etag(), poweredBy(), logger(), cors());

  app.get('/', (c) => {
    return c.redirect('/ui');
  });

  app.route('/', authController);
  app.route('v1/users', usersController);
  app.route('v1/posts', postController);
  app.route('v1/comments', commentController);

  app.use((c) => {
    throw createHttpError(404);
  });

  app.onError(async (err, c) => {
    const newErr = errorJson(err);
    return c.json(newErr, (err as any).status || 500);
  });

  return app;
};

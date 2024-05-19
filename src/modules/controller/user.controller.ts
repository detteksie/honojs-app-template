import { Hono } from 'hono';

import { authMiddlware } from '|/middlewares/auth.middleware';
import { paginationMiddleware } from '|/middlewares/pagination.middleware';
import { getUser } from '|/utils/get-user.util';
import { getPaginationQuery } from '|/utils/pagination-query.util';
import { successJson } from '|/utils/response.util';

import { UserService, userService } from '../services/user.service';
import { userValidation } from '../validations/user.validation';

export const newUsersController = (userService: UserService) => {
  const app = new Hono();

  app.get('/', paginationMiddleware(), async (c) => {
    const query = getPaginationQuery(c);
    const result = await userService.getUserList({
      limit: query.limit!,
      page: query.page!,
      route: c.req.url,
    });
    return c.json(successJson(result));
  });

  app.get('/me', authMiddlware(), async (c) => {
    const user = getUser(c);
    const result = await userService.getUser(user.id);
    return c.json(successJson(result));
  });

  app.get('/me/posts', authMiddlware(), async (c) => {
    const user = getUser(c);
    const result = await userService.getMyPost(user.id);
    return c.json(successJson(result));
  });

  app.get('/me/comments', authMiddlware(), async (c) => {
    const user = getUser(c);
    const result = await userService.getMyComments(user.id);
    return c.json(successJson(result));
  });

  app.get('/:userId', userValidation.userId, async (c) => {
    const params = c.req.param();
    const result = await userService.getUser(parseInt(params.userId));
    return c.json(successJson(result));
  });

  app.patch(
    '/me',
    authMiddlware(),
    userValidation.userId,
    userValidation.updateProfile,
    async (c) => {
      const user = getUser(c);
      const body = await c.req.json();
      await userService.updateUser(user.id, body);
      c.status(204);
      return c.json({});
    },
  );

  return app;
};

export const usersController = newUsersController(userService);

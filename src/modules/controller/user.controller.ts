import { Hono } from 'hono';

import { authMiddlware } from '|/middlewares/auth.middleware';
import { paginationMiddleware } from '|/middlewares/pagination.middleware';
import { getUser } from '|/utils/get-user.util';
import { getPaginationQuery } from '|/utils/pagination-query.util';
import { successJson } from '|/utils/response.util';

import { UserService, userService } from '../services/user.service';
import { userValidation } from '../validations/user.validation';

export const newUsersController = (userService: UserService) => {
  const app = new Hono()

    .get('/', paginationMiddleware(), async (c) => {
      const query = getPaginationQuery(c);
      const result = await userService.getUserList({
        limit: query.limit!,
        page: query.page!,
        route: c.req.url.split('?')[0],
      });
      return c.json(successJson(result));
    })

    .get('/u/:userId', userValidation.userId, async (c) => {
      const params = c.req.valid('param');
      const result = await userService.getUser(parseInt(params.userId));
      return c.json(successJson(result));
    })

    .get('/me', authMiddlware(), async (c) => {
      const user = getUser(c);
      const result = await userService.getUser(user.id);
      return c.json(successJson(result));
    })

    .get('/me/posts', authMiddlware(), async (c) => {
      const user = getUser(c);
      const result = await userService.getMyPost(user.id);
      return c.json(successJson(result));
    })

    .get('/me/comments', authMiddlware(), async (c) => {
      const user = getUser(c);
      const result = await userService.getMyComments(user.id);
      return c.json(successJson(result));
    })

    .patch('/me', authMiddlware(), userValidation.updateProfile, async (c) => {
      const user = getUser(c);
      const body = c.req.valid('json') as any;
      await userService.updateUser(user.id, body);
      c.status(204);
      return c.json({});
    });

  return app;
};

export const usersController = newUsersController(userService);

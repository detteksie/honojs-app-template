import { Hono } from 'hono';

import { authMiddlware } from '|/middlewares/auth.middleware';
import { paginationMiddleware } from '|/middlewares/pagination.middleware';
import { getUser } from '|/utils/get-user.util';
import { getPaginationQuery } from '|/utils/pagination-query.util';
import { successJson } from '|/utils/response.util';

import { PostService, postService } from '../services/post.service';
import { postValidation } from '../validations/post.validation';

export const newPostController = (postService: PostService) => {
  const app = new Hono();

  app
    .get('/', paginationMiddleware(), async (c) => {
      const query = getPaginationQuery(c);
      const result = await postService.getPostList({
        limit: query.limit!,
        page: query.page!,
        route: c.req.url,
      });
      return c.json(successJson(result));
    })
    .get('/:postId', postValidation.postId, async (c) => {
      const postId = c.req.param('postId');
      const result = await postService.getPost(parseInt(postId));
      return c.json(successJson(result));
    });

  // authenticated
  app.use(authMiddlware());

  app.post('/', postValidation.createPost, async (c) => {
    const user = getUser(c);
    const body = await c.req.json();
    const result = await postService.createPost(user.id, body);
    c.status(201);
    return c.json(successJson(result));
  });

  app.post('/:postId/comments', postValidation.addPostComment, async (c) => {
    const user = getUser(c);
    const postId = c.req.param('postId');
    const body = await c.req.json();
    const result = await postService.addPostComment(user.id, parseInt(postId), body);
    c.status(201);
    return c.json(successJson(result));
  });

  app.get('/:postId/comments', postValidation.postId, async (c) => {
    const postId = c.req.param('postId');
    const result = await postService.getPostComments(parseInt(postId));
    return c.json(successJson(result));
  });

  app.patch('/:postId', postValidation.updatePost, async (c) => {
    const user = getUser(c);
    const postId = c.req.param('postId');
    const body = await c.req.json();
    await postService.updatePost(user.id, parseInt(postId), body);
    return c.json(null, 204);
  });

  app.patch('/:postId/publish', postValidation.publishPost, async (c) => {
    const user = getUser(c);
    const postId = c.req.param('postId');
    const body = await c.req.json();
    await postService.publishPost(user.id, parseInt(postId), body);
    return c.json(null, 204);
  });

  app.delete('/:postId', postValidation.postId, async (c) => {
    const user = getUser(c);
    const postId = c.req.param('postId');
    await postService.deletePost(user.id, parseInt(postId));
    return c.json(null, 204);
  });

  return app;
};

export const postController = newPostController(postService);

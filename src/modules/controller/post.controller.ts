import { Hono } from 'hono';

import { authMiddlware } from '|/middlewares/auth.middleware';
import { paginationMiddleware } from '|/middlewares/pagination.middleware';
import { getUser } from '|/utils/get-user.util';
import { getPaginationQuery } from '|/utils/pagination-query.util';
import { successJson } from '|/utils/response.util';

import { PostService, postService } from '../services/post.service';
import { postValidation } from '../validations/post.validation';

export const newPostController = (postService: PostService) => {
  const app = new Hono()

    .get('/', paginationMiddleware(), async (c) => {
      const query = getPaginationQuery(c);
      const result = await postService.getPostList({
        limit: query.limit!,
        page: query.page!,
        route: c.req.url,
      });
      return c.json(successJson(result));
    })

    .get('/p/:postId', postValidation.postId, async (c) => {
      const { postId } = c.req.valid('param');
      const result = await postService.getPost(parseInt(postId));
      return c.json(successJson(result));
    })

    // authenticated
    .use(authMiddlware())

    .post('/', postValidation.createPost, async (c) => {
      const user = getUser(c);
      const body = c.req.valid('json');
      const result = await postService.createPost(user.id, body);
      c.status(201);
      return c.json(successJson(result));
    })

    .post(
      '/p/:postId/comments',
      postValidation.postId,
      postValidation.addPostComment,
      async (c) => {
        const user = getUser(c);
        const { postId } = c.req.valid('param');
        const body = c.req.valid('json');
        const result = await postService.addPostComment(user.id, parseInt(postId), body);
        c.status(201);
        return c.json(successJson(result));
      },
    )

    .get('/p/:postId/comments', postValidation.postId, async (c) => {
      const { postId } = c.req.valid('param');
      const result = await postService.getPostComments(parseInt(postId));
      return c.json(successJson(result));
    })

    .patch('/p/:postId', postValidation.postId, postValidation.updatePost, async (c) => {
      const user = getUser(c);
      const { postId } = c.req.valid('param');
      const body = c.req.valid('json');
      await postService.updatePost(user.id, parseInt(postId), body);
      return c.json(null, 204);
    })

    .patch('/p/:postId/publish', postValidation.postId, postValidation.publishPost, async (c) => {
      const user = getUser(c);
      const { postId } = c.req.valid('param');
      const body = c.req.valid('json');
      await postService.publishPost(user.id, parseInt(postId), body);
      return c.json(null, 204);
    })

    .delete('/p/:postId', postValidation.postId, postValidation.postId, async (c) => {
      const user = getUser(c);
      const { postId } = c.req.valid('param');
      await postService.deletePost(user.id, parseInt(postId));
      return c.json(null, 204);
    });

  return app;
};

export const postController = newPostController(postService);

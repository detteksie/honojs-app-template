import { Hono } from 'hono';

import { authMiddlware } from '|/middlewares/auth.middleware';
import { getUser } from '|/utils/get-user.util';

import { CommentService, commentService } from '../services/comment.service';
import { commentValidation } from '../validations/comment.validation';

export const newCommentController = (commentService: CommentService) => {
  const app = new Hono()

    .use(authMiddlware())

    .patch(
      '/c/:commentId',
      commentValidation.commentId,
      commentValidation.updateComment,
      async (c) => {
        const user = getUser(c);
        const { commentId } = c.req.valid('param');
        const body = c.req.valid('json');
        await commentService.updateComment(user.id, parseInt(commentId), body);
        return c.json(null, 204);
      },
    )

    .patch(
      '/c/:commentId/hide',
      commentValidation.commentId,
      commentValidation.hideComment,
      async (c) => {
        const user = getUser(c);
        const { commentId } = c.req.valid('param');
        const body = c.req.valid('json');
        await commentService.hideComment(user.id, parseInt(commentId), body);
        return c.json(null, 204);
      },
    )

    .delete('/c/:commentId', commentValidation.commentId, async (c) => {
      const user = getUser(c);
      const { commentId } = c.req.valid('param');
      await commentService.deleteComment(user.id, parseInt(commentId));
      return c.json(null, 204);
    });

  return app;
};

export const commentController = newCommentController(commentService);

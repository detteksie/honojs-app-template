import { Hono } from 'hono';
import { authMiddlware } from '~/middlewares/auth.middleware';
import { CommentService, commentService } from '~/modules/services/comment.service';
import { commentValidation } from '../validations/comment.validation';
import { getUser } from '~/utils/get-user.util';

export const newCommentController = (commentService: CommentService) => {
  const app = new Hono()
    .use(authMiddlware())
    .patch('/:commentId', commentValidation.updateComment, async (c) => {
      const user = getUser(c);
      const commentId = c.req.param('commentId');
      const body = await c.req.json();
      await commentService.updateComment(user.id, parseInt(commentId), body);
      return c.json(null, 204);
    })
    .patch('/:commentId/hide', commentValidation.hideComment, async (c) => {
      const user = getUser(c);
      const commentId = c.req.param('commentId');
      const body = await c.req.json();
      await commentService.hideComment(user.id, parseInt(commentId), body);
      return c.json(null, 204);
    })
    .delete('/:commentId', commentValidation.commentId, async (c) => {
      const user = getUser(c);
      const commentId = c.req.param('commentId');
      await commentService.deleteComment(user.id, parseInt(commentId));
      return c.json(null, 204);
    });

  return app;
};

export const commentController = newCommentController(commentService);

import { zValidator } from '@hono/zod-validator';

import { commentIdParam, hideCommentDto, updateCommentDto } from '../dto/comment.dto';

export class CommentValidation {
  commentId = zValidator('param', commentIdParam);

  updateComment = zValidator('json', updateCommentDto);

  hideComment = zValidator('json', hideCommentDto);
}

export const commentValidation = new CommentValidation();

import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

export class CommentValidation {
  commentId = zValidator(
    'param',
    z.object({
      commentId: z.string(),
    }),
  );

  updateComment = zValidator(
    'json',
    z.object({
      content: z.string().optional(),
    }),
  );

  hideComment = zValidator(
    'json',
    z.object({
      hidden: z.boolean().optional(),
    }),
  );
}

export const commentValidation = new CommentValidation();

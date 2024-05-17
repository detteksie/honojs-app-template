import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

export class PostValidation {
  createPost = zValidator(
    'json',
    z.object({
      title: z.string().max(255),
      content: z.string(),
    }),
  );

  postId = zValidator(
    'param',
    z.object({
      postId: z.string(),
    }),
  );

  updatePost = zValidator(
    'json',
    z.object({
      title: z.string().max(255).optional(),
      content: z.string().optional(),
    }),
  );

  publishPost = zValidator(
    'json',
    z.object({
      isPublished: z.boolean().optional(),
    }),
  );

  addPostComment = zValidator(
    'json',
    z.object({
      content: z.string(),
    }),
  );
}

export const postValidation = new PostValidation();

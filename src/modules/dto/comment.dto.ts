import { z } from '@hono/zod-openapi';

export const commentIdParam = z.object({
  commentId: z.string(),
});
export type CommentIdParam = z.infer<typeof commentIdParam>;

export const updateCommentDto = z.object({
  content: z.string().optional(),
});
export type UpdateCommentDto = z.infer<typeof updateCommentDto>;

export const hideCommentDto = z.object({
  hidden: z.boolean().optional(),
});
export type HideCommentDto = z.infer<typeof hideCommentDto>;

import { z } from '@hono/zod-openapi';

export const postIdParam = z.object({
  postId: z.string(),
});
export type PostIdParam = z.infer<typeof postIdParam>;

export const createPostDto = z.object({
  title: z.string().max(255).min(1),
  content: z.string().min(1),
});
export type CreatePostDto = z.infer<typeof createPostDto>;

export const updatePostDto = z.object({
  title: z.string().max(255).optional(),
  content: z.string().optional(),
});
export type UpdatePostDto = z.infer<typeof updatePostDto>;

export const publishPostDto = z.object({
  isPublished: z.boolean().optional(),
});
export type PublishPostDto = z.infer<typeof publishPostDto>;

export const addPostCommentDto = z.object({
  content: z.string(),
});
export type AddPostCommentDto = z.infer<typeof addPostCommentDto>;

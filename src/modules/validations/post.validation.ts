import { zValidator } from '@hono/zod-validator';

import {
  addPostCommentDto,
  createPostDto,
  postIdParam,
  publishPostDto,
  updatePostDto,
} from '../dto/post.dto';

export class PostValidation {
  postId = zValidator('param', postIdParam);

  createPost = zValidator('json', createPostDto);

  updatePost = zValidator('json', updatePostDto);

  publishPost = zValidator('json', publishPostDto);

  addPostComment = zValidator('json', addPostCommentDto);
}

export const postValidation = new PostValidation();

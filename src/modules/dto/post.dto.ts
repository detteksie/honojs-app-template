export class CreatePostDto {
  title: string;
  content: string;
}

export class UpdatePostDto {
  title?: string;
  content?: string;
}

export class PublishPostDto {
  isPublished?: boolean;
}

export class AddPostCommentDto {
  content: string;
}

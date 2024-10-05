import { z } from '@hono/zod-openapi';

export const userIdParam = z.object({
  userId: z.string({}),
});
export type UserIdParam = z.infer<typeof userIdParam>;

export const createUserDto = z.object({
  name: z.string().max(255),
  email: z.string().email().trim(),
  password: z.string().min(8).max(64),
  birthdate: z.date().optional(),
});
export type CreateUserDto = z.infer<typeof createUserDto>;

export const updateUserDto = z.object({
  name: z.string().max(255),
  birthdate: z.date().optional(),
});
export type UpdateUserDto = z.infer<typeof updateUserDto>;

import { z } from '@hono/zod-openapi';

export const registerDto = z.object({
  email: z.string().email().trim(),
  username: z.string().max(255),
  password: z.string().min(8).max(64),
  name: z.string().max(255),
  birthdate: z.date().optional(),
});
export type RegisterDto = z.infer<typeof registerDto>;

export const loginDto = z.object({
  userSession: z.string(),
  password: z.string().min(8).max(64),
});
export type LoginDto = z.infer<typeof loginDto>;

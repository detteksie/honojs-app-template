import { z } from '@hono/zod-openapi';
import { zValidator } from '@hono/zod-validator';

export class UserValidation {
  createUser = zValidator(
    'json',
    z.object({
      name: z.string().max(255),
      email: z.string().email().trim(),
      password: z.string().min(8).max(64),
      birthdate: z.date().optional(),
    }),
  );

  userId = zValidator(
    'param',
    z.object({
      userId: z.string({}),
    }),
  );

  updateProfile = zValidator(
    'json',
    z.object({
      name: z.string().max(255),
      birthdate: z.date().optional(),
    }),
  );
}

export const userValidation = new UserValidation();

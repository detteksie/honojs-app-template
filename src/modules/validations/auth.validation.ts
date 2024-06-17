import { z } from '@hono/zod-openapi';
import { zValidator } from '@hono/zod-validator';

export class AuthValidation {
  register = zValidator(
    'json',
    z.object({
      email: z.string().email().trim(),
      username: z.string().max(255),
      password: z.string().min(8).max(64),
      name: z.string().max(255),
      birthdate: z.date().optional(),
    }),
  );

  login = zValidator(
    'json',
    z.object({
      userSession: z.string(),
      password: z.string().min(8).max(64),
    }),
  );
}

export const authValidation = new AuthValidation();
